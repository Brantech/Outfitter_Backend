'''
    main.py

    @author Daquaris Chadwick
    
    The main entry point
'''
import matplotlib.pyplot as plt

import keras
import learn.outfitter_model as OModel
import math
import numpy as np
import os
import tensorflow as tf

from keras.utils import CustomObjectScope
from keras.initializers import glorot_uniform
from keras.models import load_model 

from skimage import color, img_as_float
from skimage.transform import resize
from skimage.util import pad


data_path = os.path.abspath('./data')

def parse_image(filename, label):
    imar = np.array([[1.,0.], [0.,0.],
                    [0.,1.], [0.,1.],
                    [0.,0.], [1.,1.]]).transpose()
    im = plt.imread(filename)
    im = img_as_float(im)
    im = color.rgb2gray(im)

    diff = int((len(im)-len(im[0])))
    rem = diff % 2
    padding_count = math.ceil(diff/2)

    padding = tf.constant([[rem, 0], [padding_count, padding_count]])
    im = tf.pad(tf.constant(im), padding, mode="constant", constant_values=1)
    im = tf.Session().run(im)
    
    im = resize(im, (28, 28), anti_aliasing=True)

    return im, label

model = OModel.OutfitterModel()
model.train(os.path.join(data_path, 'clothing_pred.h5'), model.train_images, model.train_labels)

x = parse_image(os.path.join(data_path, 'shirt.jpg'), 0)
model.predict(x)