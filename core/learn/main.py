'''

main.py

@author Daquaris Chadwick

To Run: python main.py [--train] 

'''
# Set up matplotlib
import matplotlib as mpl

# TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras
from keras.models import load_model

# Helper Libraries
import numpy as np
import matplotlib.pyplot as plt
import argparse


class_names = [
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

fashion_mnist = keras.datasets.fashion_mnist

(train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()

# rescale values from 0-255 to 0-1
train_images = train_images / 255.0
test_images = test_images / 255.0


def plot_image(i, predictions_array, true_label, img):
    ''' Plot image '''
    
    predictions_array, true_label, img = predictions_array[i], true_label[i], img[i]
    plt.grid(False)
    plt.xticks([])
    plt.yticks([])

    plt.imshow(img, cmap=plt.cm.binary)

    predicted_label = np.argmax(predictions_array)
    if predicted_label == true_label:
        color = 'blue'
    else:
        color = 'red'
    
    plt.xlabel("{} {:2.0f}% ({})".format(class_names[predicted_label],
        100*np.max(predictions_array),
        class_names[true_label]),
        color=color)


def plot_value_array(i, predictions_array, true_label):
    ''' Plot value array '''

    predictions_array, true_label = predictions_array[i], true_label[i]
    plt.grid(False)
    plt.xticks([])
    plt.yticks([])
    thisplot = plt.bar(range(10), predictions_array, color="#777777")
    plt.ylim([0, 1])
    predicted_label = np.argmax(predictions_array)

    thisplot[predicted_label].set_color('red')
    thisplot[true_label].set_color('blue')


def train_clothing_predictor(train_input, train_output):
    ''' Train clothing predictor '''

    # Create the model
    model = keras.Sequential([
        keras.layers.Flatten(input_shape=(28, 28)),
        keras.layers.Dense(128, activation=tf.nn.relu),
        keras.layers.Dense(10, activation=tf.nn.softmax)
    ])

    model.compile(optimizer=tf.train.AdamOptimizer(),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )

    model.fit(train_input, train_output, epochs=5)

    return model


def main(model):

    test_loss, test_acc = model.evaluate(test_images, test_labels)
    print('Test Accuracy: ', test_acc)

    predictions = model.predict(test_images)
    pred = np.argmax(predictions[0])
    print('corr: %s - pred: %s' % (test_labels[0], pred))

    num_rows = 5
    num_cols = 3
    num_images = num_rows*num_cols
    plt.figure(figsize=(2*2*num_cols, 2*num_rows))
    for i in range(num_images):
        plt.subplot(num_rows, 2*num_cols, 2*i+1)
        plot_image(i, predictions, test_labels, test_images)
        plt.subplot(num_rows, 2*num_cols, 2*i+2)
        plot_value_array(i, predictions, test_labels)
    plt.show()


parser = argparse.ArgumentParser(description='Parse model state')
parser.add_argument('-t', '--train', action='store_true', help='Train model flag')
args = parser.parse_args()

if args.train:
    model = train_clothing_predictor(train_images, train_labels)
    model.save('clothing_pred.h5')
else:
    try:
        model = keras.models.load_model('./clothing_pred.h5')
        model.compile(optimizer=tf.train.AdamOptimizer(),
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )
    except Exception as err:
        print('ERROR: Model Retrieval Error: {}'.format(err))
        exit()

print('================> START')
main(model)
print('================> END')