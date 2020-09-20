from app import app
from flask import request
import requests
from app import Globals
import json


@app.route("/api/login", methods=['POST'])
def login():
    requestbody = request.get_data()

    response = requests.post(
        url=Globals.slim + "/login/authenticate", data=requestbody, headers={"content-type": "application/x-www-form-urlencoded"})

    if response.ok:
        return response.json()
    else:
        return response.text, response.status_code
