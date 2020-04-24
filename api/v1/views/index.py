"""
Flask route that returns json status response
"""
from views import app_views, app_template_views
from flask import Flask, jsonify, json, render_template, request
# from models import filename_of_model

@app_template_views.route('/')
def home():
    # data = json.load(open('config_options.json'))
    # return render_template("index.html", data=data)
    data = {"hello": "world"}
    return render_template("index.html", data=data)