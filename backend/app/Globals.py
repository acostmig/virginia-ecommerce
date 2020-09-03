from typing import Final

from flask import request


slim: Final = "http://slim:8002"


def getClientIP():
    if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
        ip = request.environ['REMOTE_ADDR']
    else:
        ip = request.environ['HTTP_X_FORWARDED_FOR']

    return ip
