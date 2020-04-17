#!/home/pi/Documents/python-dolly-cam-app/venv/bin/python3

import os
import sys
import time     # Import the sleep function from the time module
# import gphoto2 as gp
# import RPi.GPIO as GPIO

# GPIO.cleanup()
# os.system(". venv/bin/activate")

# Initialize motor position
global steps_taken
steps_taken = 0

# Motor GPIO set up
step_seq = [
  [1,0,0,0],
  [1,1,0,0],
  [0,1,0,0],
  [0,1,1,0],
  [0,0,1,0],
  [0,0,1,1],
  [0,0,0,1],
  [1,0,0,1]
]

# GPIO.setmode(GPIO.BOARD)
# control_pins = [7,11,13,15]

# for pin in control_pins:
#   GPIO.setup(pin,GPIO.OUT)
#   GPIO.output(pin,0)

print("Access IP: ")
os.system("hostname -I \n")

from flask import Flask, jsonify, json, render_template, request
app = Flask(__name__)

@app.route('/')
def home():
    json_url = os.path.join(app.root_path, '', 'config_options.json')
    data = json.load(open(json_url))

    return render_template("index.html", data=data)

@app.route('/api/blinkLed')
def blinkLed():
    

    os.system("sudo echo gpio | sudo tee /sys/class/leds/led1/trigger")
    for n in range(0, 5):
        os.system("echo 1 | sudo tee /sys/class/leds/led1/brightness")
        time.sleep(1)
        os.system("echo 0 | sudo tee /sys/class/leds/led1/brightness")
        time.sleep(1)

    os.system("sudo echo input | sudo tee /sys/class/leds/led1/trigger")

    '''
    # motor return
    while Buttonback == True:
        for i in range(steps_taken,0,-1):
            for step in range(7,-1,-2):
                for pin in range(4):
                    GPIO.output(control_pins[pin], step_seq[step][pin])
                time.sleep(0.002)
        steps_taken == 0  # reset motor position
    '''

    return jsonify("hello")


global motorMove
global stopCommandIssued

motorMove = False
stopCommandIssued = False

def checkIfMotorShouldMove():
    global motorMove
    global stopCommandIssued

    if stopCommandIssued == True:
        motorMove = False

def startRunningMotor():
    global motorMove
    global steps_taken

    while motorMove == True:
        for step in range(0,8,2): # one full loop through is one rotation of motor (prior to gearing)
            for pin in range(4):
                GPIO.output(control_pins[pin], step_seq[step][pin])
            time.sleep(0.002)
        steps_taken += 1

        checkIfMotorShouldMove()
    
    print("Stopping Motor. Total Steps Taken:")
    print(steps_taken)

@app.route('/api/forwardStart')
def forwardStart():
    global motorMove
    motorMove = True
    startRunningMotor()

    global stopCommandIssued
    stopCommandIssued = False
    return jsonify("OK")

@app.route('/api/forwardStop')
def forwardStop():
    global stopCommandIssued
    stopCommandIssued = True

    return jsonify("OK")

@app.route('/api/rewind')
def rewind():
    global steps_taken
    print("Initiating Rewind. Total Steps To Take:")
    print(steps_taken)

    for i in range(0, steps_taken):
        for step in range(7,-1,-2): # one full loop through is one rotation of motor (prior to gearing)
            for pin in range(4):
                GPIO.output(control_pins[pin], step_seq[step][pin])
            time.sleep(0.002)

    steps_taken = 0
    return jsonify("OK")

@app.route('/api/captureImage')
def captureImage():
    os.system("gphoto2 --capture-image")
    return jsonify("Works")

@app.route('/api/changeCameraSettings')
def changeSettings():
    optionName = request.args.get('optionName', 0, type=str)
    optionValue = request.args.get('optionValue', 0, type=str)

    os.system('gphoto2 --set-config={}={}'.format(optionName, optionValue))

    return jsonify("OK!")

# Run Server
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
