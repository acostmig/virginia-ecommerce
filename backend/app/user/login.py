from app import app
from flask import request
import requests
from app import Globals
import json


@app.route("/api/login", methods=['POST'])
def login():
    requestbody = request.get_json()

    requestbody.update({'ip_address': Globals.getClientIP()})

    response = requests.post(
        url=Globals.slim + "/api/login/authenticate", data=json.dumps(requestbody), headers={"content-type": "application/json"})

    if response.ok:
        return response.json()
    else:
        return response.text, response.status_code
