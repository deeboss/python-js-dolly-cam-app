from views import app_views
from flask import Flask, jsonify, json, render_template, request
from models import Stepper
import os
import sys
import time     # Import the sleep function from the time module
import RPi.GPIO as GPIO

GPIO.cleanup()

# Initialize pins
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11,GPIO.OUT) # direction
GPIO.setup(13,GPIO.OUT) # step

## MOTOR CLASS ###
class motorClass:
    
    # Initialize movement
    def __init__(self):
        self.motorMove = False
        self.stepsTaken = 0
    
    # Motor move
    def Move(self):  
        while self.motorMove == True:
            GPIO.output(13,True)
            GPIO.output(13,False)
            time.sleep(0.001)
            
            if GPIO.input(11) == True:
                self.stepsTaken+=1
            elif GPIO.input(11) == False:
                self.stepsTaken-=1

    def Start(self):
        self.motorMove = True
    def Stop(self):
        self.motorMove = False
        
# Run class after initializing
motorClass = motorClass()


## BUTTONS ##

@app_views.route('/forwardStart')
def forwardStart():
    print("boom")
    GPIO.output(11,True) # set direction
    motorClass.Start()
    motorClass.Move()
    return jsonify("OK")

@app_views.route('/forwardStop')
def forwardStop():
    motorClass.Stop()
    return jsonify("OK")


@app_views.route('/backwardStart')
def backwardStart():
    GPIO.output(11,False)
    motorClass.Start()
    motorClass.Move()
    return jsonify("OK")

@app_views.route('/backwardStop')
def backwardStop():
    motorClass.Stop()
    return jsonify("OK")

@app_views.route('/rewind')
def rewind():
    if motorClass.stepsTaken > 0:
        sign = 1
        direction = False
    elif motorClass.stepsTaken < 0:
        sign = -1
        direction = True
    else:
        return jsonify("OK")
    
    print(motorClass.stepsTaken)
    print(sign)
    
    for i in range(0,motorClass.stepsTaken,sign):
        GPIO.output(11,direction)
        GPIO.output(13,True)
        GPIO.output(13,False)
        time.sleep(0.001)

    motorClass.stepsTaken = 0
    return jsonify("OK")
    
