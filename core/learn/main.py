# Set up matplotlib
import matplotlib as mpl

# TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras

# Helper Libraries
import numpy as np
import matplotlib.pyplot as plt

def main():

    fashion_mnist = keras.datasets.fashion_mnist

    (train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()
    
    # rescale values from 0-255 to 0-1
    train_images = train_images / 255.0
    test_images = test_images / 255.0

    class_names = [
        'T-shirt/top', 
        'Trouser',
        'Pullover',
        'Dress',
        'Coat',
        'Sandal',
        'Bag',
        'Ankle boot']

    # plt.figure(figsize=(10,10))
    
    '''
    for i in range(25):
        plt.subplot(5, 5, i+1)
        plt.xticks([])
        plt.yticks([])
        plt.grid(False)
        plt.imshow(train_images[0])
        plt.imshow(train_images[i], cmap=plt.cm.binary)
    
    plt.show()
    '''

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

    model.fit(train_images, train_labels, epochs=5)

    test_loss, test_acc = model.evaluate(test_images, test_labels)
    print('Test Accuracy: ', test_acc)

print('================> START')
main()
print('================> END')