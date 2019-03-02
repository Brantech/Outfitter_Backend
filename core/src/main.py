'''
    main.py

    @author Daquaris Chadwick
    
    The main entry point
'''
from learn.outfitter_model import OutfitterModel
import tensorflow as tf
import numpy as np
from tensorflow import keras


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

test_images = test_images / 255.0
# list_of_lists = [train_images.shape[1:], 128]
# print([len(list_of_lists)] + [len(list_of_lists[0])])
# exit()

model = OutfitterModel((train_images, train_labels), class_names)
model.train(test_images, test_labels)