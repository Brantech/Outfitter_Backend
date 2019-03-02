'''

learn.py

@author Daquaris Chadwick

The core learning class.

MAKE THIS FASTER!!!!

'''
# TensorFlow and tf.keras
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.layers import Flatten
import numpy as np
import pandas as pd

def parse_labels(labels, label_count=10):
    ret_array = []
    for label in labels:
        out = np.zeros((label_count,))
        out[label] = 1
        ret_array.append(out)
    return np.array(ret_array)

class OutfitterModel:
    def __init__(self, data, classes):
        (self.train_images, self.train_labels) = data

        self.n_class = len(classes)

        # Preprocessing
        self.train_images = self.train_images / 255.0
        self.train_labels = parse_labels(self.train_labels, self.n_class)
        
        self.learning_rate = 0.01
        self.training_epochs = 1000
        self.n_dim = self.train_images.shape[1:]
        
        self.train_images = self.train_images.reshape(self.train_images.shape[0], -1)

        self.n_hidden_1 = 128
        self.n_hidden_2 = self.n_class

        self.weights = {
            'h1': tf.Variable(tf.truncated_normal([self.n_dim[0] * self.n_dim[1], self.n_hidden_1])),
            'h2': tf.Variable(tf.truncated_normal([self.n_hidden_1, self.n_hidden_2]))
        }
        self.biases = {
            'b1': tf.Variable(tf.truncated_normal([self.n_hidden_1])),
            'b2': tf.Variable(tf.truncated_normal([self.n_hidden_2]))
        }

    def train(self, test_input, test_output):
        ''' Train predictor '''
        
        test_input = test_input.reshape(test_input.shape[0], -1)
        test_output = parse_labels(test_output, self.n_class)

        x = tf.placeholder(tf.float32, [None, self.n_dim[0] * self.n_dim[1]]) # Flatten this
        W = tf.Variable(tf.zeros([(self.n_dim[0] * self.n_dim[1]), self.n_class]))
        b = tf.Variable(tf.zeros([self.n_class]))
        y_ = tf.placeholder(tf.float32, [None, self.n_class])
        
        y = self.multilayer_perceptron(x, self.weights, self.biases)
        
        saver = tf.train.Saver()

        cost_function = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits_v2(logits=y, labels=y_))
        training_step = tf.train.AdamOptimizer(self.learning_rate).minimize(cost_function)

        init = tf.global_variables_initializer()

        mse_history = []
        accuracy_history = []
        cost_history = []

        with tf.Session() as sess:
            sess.run(init)
            for epoch in range(self.training_epochs):
                sess.run(training_step, feed_dict={x: self.train_images, y_: self.train_labels})
                cost = sess.run(cost_function, feed_dict={x: self.train_images, y_: self.train_labels})
                cost_history = np.append(cost_history, cost)
                correct_prediction = tf.equal(tf.argmax(y, 1), tf.argmax(y_, 1))
                accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
                pred_y = sess.run(y, feed_dict={x: test_input})
                mse = tf.reduce_mean(tf.square(pred_y - test_output))
                mse_ = sess.run(mse)
                mse_history.append(mse_)
                accuracy = (sess.run(accuracy, feed_dict={x: self.train_images, y_: self.train_labels}))
                accuracy_history.append(accuracy)

                if epoch % 50 == 0:
                    print('epoch: ', epoch, ' - ', 'cost: ', cost, ' - MSE: ', mse_, ' - Train Accuracy: ', accuracy)

            #save_path = saver.save(sess, model_path)
            plt.plot(mse_history, 'r')
            plt.show()
            plt.plot(accuracy_history)
            plt.show()

            correct_prediction = tf.equal(tf.argmax(y, 1), tf.argmax(y_, 1))
            accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
            print("Test Accuracy: ", (sess.run(accuracy, feed_dict={x: test_input, y_: test_output})))

            pred_y = sess.run(y, feed_dict={x: test_input})
            mse = tf.reduce_mean(tf.square(pred_y - test_output))
            print("MSE: %.4f"%sess.run(mse))

    def multilayer_perceptron(self, x, weights, biases):
        layer_1 = tf.add(tf.matmul(x, weights['h1']), biases['b1'])
        layer_1 = tf.nn.relu(layer_1)

        out_layer = tf.add(tf.matmul(layer_1, weights['h2']), biases['b2'])
        out_layer = tf.nn.softmax(out_layer)
        return out_layer
