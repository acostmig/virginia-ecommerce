from app import app
from flask import request
import requests


@app.route("/api")
def index():

    if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
        ip = request.environ['REMOTE_ADDR']
        remote = True
    else:
        ip = request.environ['HTTP_X_FORWARDED_FOR']
        remote = False
    return {"Hello Worlds": 'lol', "hi": "helloss", "ClientIP": ip, "Remote": remote}
