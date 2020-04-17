"""
Flask route that returns json status response
"""
import os
from views import app_views
from flask import Flask, jsonify, json, render_template, request
# from models import filename_of_model

@app_views.route('/test', methods=['GET'])
def test():
    """
    function for status route that returns the status
    """
    data = {"status": "OK"}
    return jsonify(data)

@app_views.route('/captureImage', methods=['GET', 'POST'])
def captureImage():
    os.system("gphoto2 --capture-image")
    return jsonify("Works")

@app_views.route('/changeCameraSettings', methods=['GET', 'POST'])
def changeSettings():
    optionName = request.args.get('optionName', 0, type=str)
    optionValue = request.args.get('optionValue', 0, type=str)

    os.system('gphoto2 --set-config={}={}'.format(optionName, optionValue))

    return jsonify("OK!")