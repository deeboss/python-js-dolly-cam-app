#!/home/pi/venv/bin/python3

import os
import sys
import time     # Import the sleep function from the time module
import gphoto2 as gp

os.system(". /home/pi/venv/bin/activate")

print("Access IP: ")
os.system("hostname -I \n")

# Detect if python script is running on Raspberry Pi.
if os.uname()[1].startswith("raspberry"):
    import RPi.GPIO as GPIO    # Import Raspberry Pi GPIO library

from flask import Flask, jsonify, render_template, request
app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/blinkLed')
def blinkLed():
    os.system("sudo echo gpio | sudo tee /sys/class/leds/led1/trigger")
    for n in range(0, 5):
        os.system("echo 1 | sudo tee /sys/class/leds/led1/brightness")
        time.sleep(1)
        os.system("echo 0 | sudo tee /sys/class/leds/led1/brightness")
        time.sleep(1)

    os.system("sudo echo input | sudo tee /sys/class/leds/led1/trigger")

    return jsonify("hello")



# Run Server
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
