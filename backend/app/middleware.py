from app import app, Globals
from flask import request
import requests


@app.before_request
def before():
    if not request.path.startswith("/api/login") and not request.path.startswith("/api/open"):
        print("r.path" + request.path)
        res = requests.get(url=Globals.slim +
                           "/api/login/renewsession", headers={'Authorization': request.headers.get("Authorization")})
        if res.status_code != 200:
            return res.text, res.status_code
