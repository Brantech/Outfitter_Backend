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
import json
import shelve

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

def extract_all_features(items):
    model = OutfitterModel()
    output = {'data': {}}

    for i in clothing_items:
        output['data'].update({i: []})
        length = len(clothing_items[i])
        curr = 0

        if not os.path.exists('output/' + i):
            os.makedirs('output/' + i)

        print("\n" + i)
        print("Progress: 0/" + str(length))
        for j in clothing_items[i]:
            url_item = j[0]
            item = image.load_img(url_item, target_size=(224, 224))
            item = image.img_to_array(item)
            item = model.get_features(item).flatten().tolist()

            out = open("output/" + i + "/" + str(j[1]) + ".json", "w")
            out.write(json.dumps(item))
            out.close()
            
            curr += 1
            print("Progress: " + str(curr) + "/" + str(length))

def get_features(surveyDataItem):
    retVal = []

    for i in surveyDataItem["createdOutfit"]:
        mapping = json.load(open("output/" + i.lower() + "/mappings.json"))

        retVal.append(json.load(open("output/" + i.lower() + "/" + mapping[surveyDataItem["createdOutfit"][i]])))

    return retVal


clothing_items = get_images('data/')
extract_all_features(clothing_items)

# data = json.load(open("data/data.json"))
