from flask import Flask
import os
app = Flask(__name__)

from app import views
from .user import login
from .entity import main

from . import Globals, middleware

from flask_cors import CORS

if os.getenv("ENV") == "dev":
    cors = CORS()
    cors.init_app(app, resources={r"*": {"origins": "*"}})
