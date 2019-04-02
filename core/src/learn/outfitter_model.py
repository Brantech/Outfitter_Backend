"""

learn.py

@author Daquaris Chadwick

The core learning class.

MAKE THIS FASTER!!!!

"""

# TensorFlow and tf.keras
import tensorflow as tf
import math
import numpy as np
from keras.callbacks import TensorBoard
from keras.applications.resnet50 import ResNet50, preprocess_input, decode_predictions
from keras.layers import Input, Dense, Dropout, Activation
from keras.models import Model
from keras.optimizers import SGD


def parse_labels(labels, label_count=10):

    ret_array = []
    for label in labels:
        out = np.zeros((label_count,))
        out[label] = 1
        ret_array.append(out)
    return np.array(ret_array)


class OutfitterModel:
    def __init__(self):
        # Feature Extractor - Test other feature extractors
        self.base_model = ResNet50(weights='imagenet', include_top=False)

        self.model = None
        self.history = None
        self.test_acc = None
        self.test_loss = None

    def get_features(self, x):
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)
        return self.base_model.predict(x)

    def process_outfit_features(self, outfit_features):
        feature_vector_final = None
        for feature in outfit_features:
            if feature_vector_final is None:
                feature_vector_final = feature
            else:
                feature_vector_final = np.concatenate((feature_vector_final, feature), axis=None)
        return np.asarray(feature_vector_final)

    def create_multilayer_perceptron(self, input_layer_shape, class_count):
        inputs = Input(shape=input_layer_shape)

        exp = math.floor(math.log(input_layer_shape[0], 2.0))
        layer_size = 2 ** exp

        x = Dense(math.floor(layer_size/512), activation='relu')(inputs)
        x = Dense(math.floor(layer_size/512), activation='relu')(x)
        x = Dense(math.floor(layer_size/512), activation='relu')(x)
        x = Dense(math.floor(layer_size/512), activation='relu')(x)
        x = Dense(math.floor(layer_size/512), activation='relu')(x)

        predictions = Dense(class_count, activation='softmax')(x)
        return Model(inputs=inputs, outputs=predictions)

    def createModelInputVector(self, train_input):
        dataset_vector = []
        for (outfit_features, environment) in train_input:
            feature_vector = self.process_outfit_features(outfit_features)
            input_vector = np.concatenate((feature_vector, [np.asarray(environment)]), axis=None)
            dataset_vector.append(input_vector)
        return np.asarray(dataset_vector)

    def train(self, train_data, classes=[1, 2, 3, 4, 5]):
        (train_input, train_output) = train_data

        tbcallback = TensorBoard(log_dir='src/', histogram_freq=0, write_graph=True, write_images=True)

        input_vector = self.createModelInputVector(train_input) # To be train_input after proper post processing

        with tf.device('/device:GPU:0'):
            model = self.create_multilayer_perceptron(input_vector[0].shape, len(classes))
            sgd = SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)
            model.compile(loss='categorical_crossentropy',
                          optimizer=sgd,
                          metrics=['accuracy'])
            history = model.fit(input_vector, np.asarray(train_output),  
                                epochs=20,
                                batch_size=input_vector.size,
                                callbacks=[tbcallback])

            self.model = model
            self.model.save('my_model.h5')

            self.history = history.history
    
    def test(self, test_data):
        (test_input, test_output) = test_data

        # Load model here

        input_vector = self.createModelInputVector(test_input) # To be test_input after proper post processing
        test_acc, test_loss = self.model.evaluate(input_vector, test_output)
        
        self.test_acc = test_acc
        self.test_loss = test_loss

        print('Test Accuracy: ', test_acc, 'Test Loss: ', test_loss)
    
    def run(self, train_data, test_data):
        self.train(train_data)
        self.test(test_data)