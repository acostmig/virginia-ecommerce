FROM python:latest

ADD . ./app

WORKDIR /app

RUN pip install uwsgi
RUN pip install -r requirements.txt

CMD ["uwsgi", "app.ini"]
