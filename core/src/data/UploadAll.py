import os
import base64
import requests
import boto3
import json

URL = "http://3.211.39.88:3000/garments/"
S3_BUCKET = "https://s3.amazonaws.com/data.outfittr.net/"

def upload():
    for item in os.listdir(os.path.curdir + '/tops'):
        
        params = {'type': 'top', 'src': S3_BUCKET + 'tops/' + item}

        requests.post(URL, params)
        print('sent ' + item)

    for item in os.listdir(os.path.curdir + '/bottoms'):
        
        params = {'type': 'bottom', 'src': S3_BUCKET + 'bottoms/' + item}

        requests.post(URL, params)
        print('sent ' + item)

def delete():
    params = json.loads(requests.get(URL).text);

    for item in params['data']:
        requests.delete(URL + item['_id'])
        print("removed " + item['_id'])

upload();