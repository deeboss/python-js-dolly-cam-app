from views import app_views
from flask import Flask, jsonify, json, render_template, request
from models import servo

# Default values input
servo=servo(333,1500,1000,2000)

@app_views.route('/updateServoParameters')
def updateServoParameters():
    frequency = request.args.get('frequency', 0, type=int)
    minimum = request.args.get('minimum', 0, type=int)
    neutral = request.args.get('neutral', 0, type=int)
    maximum = request.args.get('maximum', 0, type=int)
    servo.updateValues(frequency,minimum,neutral,maximum)

@app_views.route('runServoMinimum')
def runServoMinimum():
    servo.goMinimum()

@app_views.route('runServoMaximum')
def runServoMaximum():
    servo.goMaximum()

@app_views.route('runServoNeutral')
def runServoNeutral():
    servo.goNeutral()