import os
import time     # Import the sleep function from the time module
from views import app_views
from flask import Flask, jsonify, json, render_template, request

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

@app.route('/forwardStart')
def forwardStart():
    global motorMove
    motorMove = True
    startRunningMotor()

    global stopCommandIssued
    stopCommandIssued = False
    return jsonify("OK")

@app.route('/forwardStop')
def forwardStop():
    global stopCommandIssued
    stopCommandIssued = True

    return jsonify("OK")

@app.route('/rewind')
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