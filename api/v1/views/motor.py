from views import app_views
from flask import Flask, jsonify, json, render_template, request
from models import Motor
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

# Run class after initializing
motor = Motor()
        
####################################################



#################### BUTTONS #######################

# Manual movement buttons
@app_views.route('/forwardStart')
def forwardStart():
    GPIO.output(11,True) # set direction
    motor.motorMove = True
    motor.Move()
    return jsonify("OK")

@app_views.route('/forwardStop')
def forwardStop():
    motor.motorMove = False
    return jsonify("OK")

@app_views.route('/backwardStart')
def backwardStart():
    GPIO.output(11,False)
    motor.motorMove = True
    motor.Move()
    return jsonify("OK")

@app_views.route('/backwardStop')
def backwardStop():
    motor.motorMove = False
    return jsonify("OK")

@app_views.route('/rewind')
def rewind():
    motor.Rewind()
    return jsonify("OK")


# Save waypoint buttons
@app_views.route('/saveWaypointOne')
def saveWaypointOne():
    motor.waypointOneSteps=motor.stepsTaken
    print("Waypoint 1 saved: ",motor.waypointOneSteps," steps")
    return jsonify("OK")

@app_views.route('/saveWaypointTwo')
def saveWaypointTwo():
    motor.waypointTwoSteps=motor.stepsTaken
    print("Waypoint 2 saved: ",motor.waypointTwoSteps," steps")
    return jsonify("OK")

@app_views.route('/saveWaypointThree')
def saveWaypointThree():
    motor.waypointThreeSteps=motor.stepsTaken
    print("Waypoint 3 saved: ",motor.waypointThreeSteps," steps")
    return jsonify("OK")


# Move to waypoint buttons
@app_views.route('/runWaypointOne')
def runWaypointOne():
    motor.gotoWaypoint(motor.waypointOneSteps)
    return jsonify("OK")

@app_views.route('/runWaypointTwo')
def runWaypointTwo():
    motor.gotoWaypoint(motor.waypointTwoSteps)
    return jsonify("OK")

@app_views.route('/runWaypointThree')
def runWaypointThree():
    motor.gotoWaypoint(motor.waypointThreeSteps)
    return jsonify("OK")
    

@app_views.route('/runSingleWaypoint')
def runWaypoint():
    targetId = request.args.get('targetId', 0, type=int)
    print(targetId)
    return jsonify("OK")

@app_views.route('runMultipleWaypoints')
def runMultipleWaypoints():
    data = request.args.get('data', [])
    print(data)
    print("yep")
    
    return jsonify("OK")
