'''

learn.py

@author Daquaris Chadwick

The core learning class.

'''
# TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras
from keras.models import load_model

# Helper Libraries
import numpy as np
import matplotlib.pyplot as plt

class OutfitterModel:

    def __init__(self):
        self.class_names = [
            'T-shirt/top', 
            'Trouser',
            'Pullover',
            'Dress',
            'Coat',
            'Sandal',
            'Shirt',
            'Sneaker',
            'Bag',
            'Ankle boot']

        self.fashion_mnist = keras.datasets.fashion_mnist
        (self.train_images, self.train_labels), (self.test_images, self.test_labels) = self.fashion_mnist.load_data()

        self.train_images = self.train_images / 255.0
        self.test_images = self.test_images / 255.0


    def train(self, train_input, train_output):
        ''' Train predictor '''

        # Create the model
        self.model = keras.Sequential([
            keras.layers.Flatten(input_shape=(28, 28)),
            keras.layers.Dense(128, activation=tf.nn.relu),
            keras.layers.Dense(10, activation=tf.nn.softmax)
        ])

        self.model.compile(optimizer=tf.train.AdamOptimizer(),
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )

        self.model.fit(train_input, train_output, epochs=5)


    def test(self):
        try:
            test_loss, test_acc = self.model.evaluate(self.test_images, self.test_labels)
            print('Test Accuracy: ', test_acc)

            predictions = self.model.predict(self.test_images)
            pred = np.argmax(predictions[0])
            print('corr: %s - pred: %s' % (self.test_labels[0], pred))
        except Exception as err:
            print('Unable to run at this time. \n' + err)