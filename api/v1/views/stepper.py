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
        self.waypointOneSteps = 0
        self.waypointTwoSteps = 0
        self.waypointThreeSteps = 0
    
    # Motor move
    def Move(self):  
        while self.motorMove == True:
            GPIO.output(13,True)
            GPIO.output(13,False)
            time.sleep(0.001)
            
            # counting steps
            if GPIO.input(11) == True:
                self.stepsTaken+=1
            elif GPIO.input(11) == False:
                self.stepsTaken-=1
                
    # Manual input forward and backward buttons
    def Start(self):
        self.motorMove = True
    def Stop(self):
        self.motorMove = False
        
    # Moving to waypoint
    def gotoWaypoint(self,waypointSteps):
        if (self.stepsTaken - waypointSteps) > 0:
            sign=-1
        elif (self.stepsTaken - waypointSteps) < 0:
            sign=+1
            
        for i in range(self.stepsTaken,waypointSteps,sign):
            GPIO.output(13,True)
            GPIO.output(13,False)
            time.sleep(0.001)
            
        self.stepsTaken=waypointSteps
        
    
        
# Run class after initializing
motorClass = motorClass()


## BUTTONS ##

# Manual movement buttons
@app_views.route('/forwardStart')
def forwardStart():
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

    for i in range(0,motorClass.stepsTaken,sign):
        GPIO.output(11,direction)
        GPIO.output(13,True)
        GPIO.output(13,False)
        time.sleep(0.001)

    motorClass.stepsTaken = 0
    return jsonify("OK")


# Save waypoint buttons
@app_views.route('/saveWaypointOne')
def saveWaypointOne():
    motorClass.waypointOneSteps=motorClass.stepsTaken
    return jsonify("OK")

@app_views.route('/saveWaypointTwo')
def saveWaypointTwo():
    motorClass.waypointTwoSteps=motorClass.stepsTaken
    return jsonify("OK")

@app_views.route('/saveWaypointThree')
def saveWaypointThree():
    motorClass.waypointThreeSteps=motorClass.stepsTaken
    return jsonify("OK")


# Move to waypoint buttons
@app_views.route('/runWaypointOne')
def runWaypointOne():
    motorClass.gotoWaypoint(motorClass.waypointOneSteps)
    return jsonify("OK")

@app_views.route('/runWaypointTwo')
def runWaypointTwo():
    motorClass.gotoWaypoint(motorClass.waypointTwoSteps)
    return jsonify("OK")

@app_views.route('/runWaypointThree')
def runWaypointThree():
    motorClass.gotoWaypoint(motorClass.waypointThreeSteps)
    return jsonify("OK")
    
