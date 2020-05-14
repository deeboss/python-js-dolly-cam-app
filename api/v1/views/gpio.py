"""
Flask route that returns json status response
"""
import os
import time     # Import the sleep function from the time module
from views import app_views
from flask import Flask, jsonify, json, render_template, request
from models import Buzzer

buzzer = Buzzer()

@app_views.route('/blinkLed', methods=['GET'])
def blinkLed():
    buzzer.playSuccess()
    os.system("sudo echo gpio | sudo tee /sys/class/leds/led1/trigger")
    for n in range(0, 5):
        os.system("echo 1 | sudo tee /sys/class/leds/led1/brightness")
        time.sleep(1)
        os.system("echo 0 | sudo tee /sys/class/leds/led1/brightness")
        time.sleep(1)

    os.system("sudo echo input | sudo tee /sys/class/leds/led1/trigger")
    return jsonify("OK")