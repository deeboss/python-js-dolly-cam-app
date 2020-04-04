import RPi.GPIO as GPIO    # Import Raspberry Pi GPIO library
import os
import sys
import time     # Import the sleep function from the time module

from flask import Flask, jsonify, render_template, request
app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")
    

@app.route('/showAlert')
def showAlert():
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    return jsonify(result=a + b)

@app.route('/blinkLed')
def blinkLed():
    os.system("sudo echo gpio | sudo tee /sys/class/leds/led0/trigger")
    for n in range(0, 5):
        os.system("echo 1 | sudo tee /sys/class/leds/led1/brightness")
        time.sleep(1)
        os.system("echo 0 | sudo tee /sys/class/leds/led1/brightness")
        time.sleep(1)

    return



if __name__ == "__main__":
    app.run(debug=True)