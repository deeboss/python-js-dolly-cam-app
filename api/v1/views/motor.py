from views import app_views
from flask import Flask, jsonify, json, render_template, request
from models import Motor, easeFunctions
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
GPIO.output(23,True)

# Run class after initializing
motor = Motor()
easeFunctions = easeFunctions()        
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


@app_views.route('runRoute')
def runRoute():
    routeFrom = request.args.get('routeFrom', 0, type=str)
    routeTo = request.args.get('routeTo', 0, type=str)
    routeDuration = request.args.get('routeDuration', 0, type=int)
    routeEasing = request.args.get('routeEasing', 0, type=str)
    print("received!")
    print([routeFrom, routeTo, routeEasing, routeDuration])

    lambdaRouteFrom = None
    lambdaRouteTo = None

    try:
        lambdaRouteFrom = getattr(motor, routeFrom)
        lambdaRouteTo = getattr(motor, routeTo)

    except AttributeError:
        raise NotImplementedError("Class `{}` does not implement `{}`".format(motor.__class__.__name__, routeTo))

    print(lambdaRouteFrom)
    print(lambdaRouteTo)


    easeArr = easeFunctions.easeInOut(lambdaRouteFrom,lambdaRouteTo,routeDuration,routeEasing)
    print(len(easeArr))
    print(lambdaRouteTo - lambdaRouteFrom)

    # Executing easeArr
    startTime = time.time()
    step=1

    if (lambdaRouteTo-lambdaRouteFrom) > 0:
        GPIO.output(11,True)
    elif (lambdaRouteTo-lambdaRouteFrom) < 0:
        GPIO.output(11,False)

    while step <= abs(lambdaRouteTo-lambdaRouteFrom):
        if easeArr[step-1] <= time.time()-startTime:
            GPIO.output(13,True)
            GPIO.output(13,False)
            step+=1 

    return jsonify(200)