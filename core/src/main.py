'''
    main.py

    @author Daquaris Chadwick
    
    The main entry point
'''
from learn.outfitter_model import OutfitterModel
from keras.preprocessing import image
import numpy as np
import os
import re

def get_images(root_dir):
    result = {'tops': [], 'bottoms': []}
    for parent, _, files in os.walk(root_dir):
        for filename in files:
            if not filename.endswith(('.jpg', '.png')):
                continue
            path = os.path.join(parent, filename)
            match = re.match(r'.*/(tops|bottoms).*', path)
            if not match:
                continue
            clothing = match.groups()[0]
            result[clothing].append((path, filename))
    return result

clothing_items = get_images('data/')

train_input = []
dataset_num = 2
for i in range(dataset_num):

    url_top = clothing_items['tops'][i][0]
    url_bottom = clothing_items['bottoms'][i][0]

    top = image.load_img(url_top, target_size=(224, 224))
    top = image.img_to_array(top)

    bottom = image.load_img(url_bottom, target_size=(224, 224))
    bottom = image.img_to_array(bottom)

    outfit = [top, bottom]
    train_input.append(outfit)

inp = [3, 1, 4, 5, 1]
train_output = []
for i in range(dataset_num):

    train_output.append(np.zeros((5,)))
    train_output[i][inp[i] - 1] = 1

test_input = []

url_top = clothing_items['tops'][5][0]
url_bottom = clothing_items['bottoms'][5][0]

top = image.load_img(url_top, target_size=(224, 224))
top = image.img_to_array(top)

bottom = image.load_img(url_bottom, target_size=(224, 224))
bottom = image.img_to_array(bottom)

outfit = [top, bottom]
test_input.append(outfit)

test_output = []
test_output.append(np.zeros((5,)))
test_output[0][3] = 1

OutfitterModel.train(train_input, train_output, (train_input, train_output))

#print(train_input, train_output, test_input, test_output)