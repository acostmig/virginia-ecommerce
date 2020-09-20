from app import app
from flask import request
import requests
from app import Globals
import json


@app.route("/api/open/entity/<id>", methods=['GET'])
def getEntity(id):
    response = requests.get(
        url=Globals.slim + f"/entity/{id}")

    if response.ok:

        return response.json()

    else:
        return response.text, response.status_code
