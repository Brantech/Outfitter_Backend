import os
import base64
import requests
import boto3
import json

URL = "http://3.211.39.88:3000/api/garments/"
S3_BUCKET = "https://s3.amazonaws.com/data.outfittr.net/"

def upload():
    for item in os.listdir(os.path.curdir + '/data/tops'):
        
        params = {'category': 'top', 'imageSource': S3_BUCKET + 'tops/' + item}

        response = requests.post(URL, params)
        print('sent ' + item)

    for item in os.listdir(os.path.curdir + '/data/bottoms'):
        
        params = {'category': 'bottom', 'imageSource': S3_BUCKET + 'bottoms/' + item}

        response = requests.post(URL, params)
        print('sent ' + item)

def delete():
    params = json.loads(requests.get(URL).text);

    for item in params['data']:
        requests.delete(URL + item['_id'])
        print("removed " + item['_id'])

upload();