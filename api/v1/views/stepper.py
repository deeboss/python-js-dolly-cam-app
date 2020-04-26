from views import app_views
from flask import Flask, jsonify, json, render_template, request
from models import Stepper
import os
import sys
import time
import RPi.GPIO as GPIO

GPIO.cleanup()

# Initialize pins
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11,GPIO.OUT) # direction
GPIO.setup(13,GPIO.OUT) # step
GPIO.setup(19,GPIO.OUT) # microstep 1
GPIO.setup(21,GPIO.OUT) # microstep 2
GPIO.setup(23,GPIO.OUT) # microstep 3
GPIO.output(19,False)
GPIO.output(21,False)
GPIO.output(23,False)


################### MOTOR CLASS ####################
class motorClass:
    
    # Initialize variables
    def __init__(self):
        self.motorMove = False
        self.stepsTaken = 0
        self.waypointOneSteps = 0
        self.waypointTwoSteps = 0
        self.waypointThreeSteps = 0
        self.idelay = 0.0002
        self.delay = 0.0008
    
    # Manual motor move
    def Move(self):  
        while self.motorMove == True:
            GPIO.output(13,True)
            time.sleep(self.idelay)
            GPIO.output(13,False)
            time.sleep(self.delay)

            # counting steps
            if GPIO.input(11) == True:
                self.stepsTaken+=1
            elif GPIO.input(11) == False:
                self.stepsTaken-=1
                
    # Moving to waypoint
    def gotoWaypoint(self,waypointSteps):
        if (self.stepsTaken - waypointSteps) > 0:
            sign=-1
            direction=False
        elif (self.stepsTaken - waypointSteps) < 0:
            sign=+1
            direction=True
            
        for i in range(self.stepsTaken,waypointSteps,sign):
            GPIO.output(11,direction)
            GPIO.output(13,True)
            time.sleep(self.idelay)
            GPIO.output(13,False)
            time.sleep(self.delay)
            
        self.stepsTaken=waypointSteps
    
    # Rewind to starting point
    def Rewind(self):
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
            time.sleep(self.idelay)
            GPIO.output(13,False)
            time.sleep(0.001)

        motorClass.stepsTaken = 0
        
# Run class after initializing
motorClass = motorClass()
        
####################################################



#################### BUTTONS #######################

# Manual movement buttons
@app_views.route('/forwardStart')
def forwardStart():
    GPIO.output(11,True) # set direction
    motorClass.motorMove = True
    motorClass.Move()
    return jsonify("OK")

@app_views.route('/forwardStop')
def forwardStop():
    motorClass.motorMove = False
    return jsonify("OK")

@app_views.route('/backwardStart')
def backwardStart():
    GPIO.output(11,False)
    motorClass.motorMove = True
    motorClass.Move()
    return jsonify("OK")

@app_views.route('/backwardStop')
def backwardStop():
    motorClass.motorMove = False
    return jsonify("OK")

@app_views.route('/rewind')
def rewind():
    motorClass.Rewind()
    return jsonify("OK")


# Save waypoint buttons
@app_views.route('/saveWaypointOne')
def saveWaypointOne():
    motorClass.waypointOneSteps=motorClass.stepsTaken
    print("Waypoint 1 saved: ",motorClass.waypointOneSteps," steps")
    return jsonify("OK")

@app_views.route('/saveWaypointTwo')
def saveWaypointTwo():
    motorClass.waypointTwoSteps=motorClass.stepsTaken
    print("Waypoint 2 saved: ",motorClass.waypointTwoSteps," steps")
    return jsonify("OK")

@app_views.route('/saveWaypointThree')
def saveWaypointThree():
    motorClass.waypointThreeSteps=motorClass.stepsTaken
    print("Waypoint 3 saved: ",motorClass.waypointThreeSteps," steps")
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
    
