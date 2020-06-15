from . import app_views
from flask import Flask, jsonify, json, render_template, request
from ..models import Servo
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(12,GPIO.OUT)

# Default values input
servo=Servo(333,1500,1000,2000)

@app_views.route('/updateServoParameters')
def updateServoParameters():
    frequency = request.args.get('frequency', 0, type=int)
    minimum = request.args.get('minimum', 0, type=int)
    neutral = request.args.get('neutral', 0, type=int)
    maximum = request.args.get('maximum', 0, type=int)
    servo.updateValues(frequency,minimum,neutral,maximum)

    return jsonify("OK")

@app_views.route('/runServoMinimum')
def runServoMinimum():
    servo.goMinimum()

    return jsonify("OK")

@app_views.route('/runServoMaximum')
def runServoMaximum():
    servo.goMaximum()

    return jsonify("OK")

@app_views.route('/runServoNeutral')
def runServoNeutral():
    servo.goNeutral()

    return jsonify("OK")
