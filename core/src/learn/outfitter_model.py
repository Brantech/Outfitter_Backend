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
from keras.callbacks import TensorBoard
from keras.applications.resnet50 import ResNet50, preprocess_input, decode_predictions
from keras.layers import Dense, Dropout, Activation
from keras.models import Sequential
from keras.optimizers import SGD
from keras.preprocessing import image
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
    def get_features(self, x):
        # Feature Extractor - Test other feature extractors
        base_model = ResNet50(weights='imagenet', include_top=False)
        
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)
        return base_model.predict(x)

    def process_outfit_features(self, outfit_features):
        feature_vector_final = None
        for feature in outfit_features:
            if feature_vector_final is None:
                feature_vector_final = feature
            else:
                feature_vector_final = np.concatenate((feature_vector_final, feature), axis=None)
        return np.asarray(feature_vector_final)
    
    def process_outfit(self, images):
        feature_vector_final = None
        for image in images:
            image_feature_vector = self.get_features(image).flatten()
            if feature_vector_final is None:
                feature_vector_final = image_feature_vector
            else:
                feature_vector_final = np.concatenate((feature_vector_final, image_feature_vector), axis=None)
        return feature_vector_final

    def create_multilayer_perceptron(self, input_layer_shape, class_count):
        model = Sequential()

        model.add(Dense(64, activation='relu', input_shape=input_layer_shape))
        model.add(Dropout(0.5))
        model.add(Dense(64, activation='relu'))
        model.add(Dropout(0.5))
        model.add(Dense(class_count, activation='softmax'))
        return model

    @staticmethod
    def train(train_data, classes=[1, 2, 3, 4, 5]):
        outfitModel = OutfitterModel()

        (train_input, train_output) = train_data

        tbcallback = TensorBoard(log_dir='src/', histogram_freq=0, write_graph=True, write_images=True)

        input_vector = np.empty((0, 200708), float)
        for (outfit_features, environment) in train_input:
            feature_vector = outfitModel.process_outfit_features(outfit_features)
            #feature_vector = outfitModel.process_outfit(outfit_features)
            input_vector = np.append(input_vector, [np.concatenate((feature_vector, [np.asarray(environment)]), axis=None)], axis=0)

        model = outfitModel.create_multilayer_perceptron(input_vector[0].shape, len(classes))
        sgd = SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)
        model.compile(loss='categorical_crossentropy',
                    optimizer=sgd,
                    metrics=['accuracy'])
        model.fit(input_vector, np.asarray(train_output),  
                epochs=20, 
                batch_size=1,
                callbacks=[tbcallback])

        return model
    
    @staticmethod
    def test(model, test_data):
        (test_input, test_output) = test_data
        return

