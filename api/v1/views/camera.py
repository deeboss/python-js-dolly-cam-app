"""
Flask route that returns json status response
"""
import os
from views import app_views
from flask import Flask, jsonify, json, render_template, request
from models import Camera

camera = Camera()


@app_views.route('/checkForDevice', methods=['GET'])
def checkForDevice():
    device = camera.checkIfDeviceExists()
    print(device[0])
    return jsonify({"device": device[0]})

@app_views.route('/captureImage', methods=['GET', 'POST'])
def captureImage():
    camera.captureImage()
    return jsonify("Works")

@app_views.route('/changeCameraSettings', methods=['GET', 'POST'])
def changeSettings():
    optionName = request.args.get('optionName', 0, type=str)
    optionValue = request.args.get('optionValue', 0, type=str)
    camera.changeSettings(optionName, optionValue)

    return jsonify("OK!")