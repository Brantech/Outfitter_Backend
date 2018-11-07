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

    class_names = [
        'T-shirt/top', 
        'Trouser',
        'Pullover',
        'Dress',
        'Coat',
        'Sandal',
        'Bag',
        'Ankle boot']

    plt.figure()
    plt.imshow(train_images[0])
    plt.colorbar()
    plt.grid(False)
    plt.show()

print('================> START')
main()
print('================> END')