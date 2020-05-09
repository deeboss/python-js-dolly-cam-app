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

#################### MANUAL MOVEMENT #######################

@app_views.route('/forwardStart')
def forwardStart():
    GPIO.output(11,True) # set direction
    motor.motorMove = True
    motor.Move()
    return jsonify("OK")

@app_views.route('/forwardStop')
def forwardStop():
    motor.motorMove = False
    data = {'current_position': motor.stepsTaken}
    return jsonify(data)

@app_views.route('/backwardStart')
def backwardStart():
    GPIO.output(11,False)
    motor.motorMove = True
    motor.Move()
    return jsonify("OK")

@app_views.route('/backwardStop')
def backwardStop():
    motor.motorMove = False
    data = {'current_position': motor.stepsTaken}
    return jsonify(data)

@app_views.route('/rewind')
def rewind():
    motor.Rewind()
    data = {'current_position': motor.stepsTaken}
    return jsonify(data)


##################### SAVE WAYPOINTS ########################
@app_views.route('/saveWaypointOne')
def saveWaypointOne():
    motor.waypointOneSteps=motor.stepsTaken
    print("Waypoint 1 saved: ",motor.waypointOneSteps," steps")
    data = {"id": 0, "name": "Waypoint 1", "steps": motor.waypointOneSteps}
    return jsonify(data)

@app_views.route('/saveWaypointTwo')
def saveWaypointTwo():
    motor.waypointTwoSteps=motor.stepsTaken
    print("Waypoint 2 saved: ",motor.waypointTwoSteps," steps")
    data = {"id": 1, "name": "Waypoint 2", "steps": motor.waypointTwoSteps}
    return jsonify(data)

@app_views.route('/saveWaypointThree')
def saveWaypointThree():
    motor.waypointThreeSteps=motor.stepsTaken
    print("Waypoint 3 saved: ",motor.waypointThreeSteps," steps")
    data = {"id": 2, "name": "Waypoint 3", "steps": motor.waypointThreeSteps}
    return jsonify(data)


###################### RUN WAYPOINTS #########################
@app_views.route('/runWaypointOne')
def runWaypointOne():
    print("Going to Waypoint One")
    try:
        motor.gotoWaypoint(motor.waypointOneSteps)
        return jsonify('Going to Waypoint One')
    except UnboundLocalError as error:
        print(error);
        return jsonify(500)
        
@app_views.route('/runWaypointTwo')
def runWaypointTwo():
    print("Going to Waypoint Two")
    try:
        motor.gotoWaypoint(motor.waypointTwoSteps)
        return jsonify(200)
    except UnboundLocalError as error:
        print(error);
        return jsonify('Going to Waypoint Two')
        
@app_views.route('/runWaypointThree')
def runWaypointThree():
    print("Going to Waypoint Three")
    try:
        motor.gotoWaypoint(motor.waypointThreeSteps)
        return jsonify(200)
    except UnboundLocalError as error:
        print(error);
        return jsonify('Going to Waypoint Three')
        
    

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


@app_views.route('runSingleRoute')
def runSingleRoute():
    routeFrom = request.args.get('routeFrom', 0, type=str)
    routeTo = request.args.get('routeTo', 0, type=str)
    routeDuration = request.args.get('routeDuration', 0, type=int)
    routeEasing = request.args.get('routeEasing', 0, type=str)
    print("==================================================")
    print("🚗 Executing Run route with the following parameters:")
    print("        From: {}\n        To: {}\n        Easing: {}\n        Duration: {}"
    .format(routeFrom, routeTo, routeEasing, routeDuration))
    print("==================================================")

    lambdaRouteFrom = None
    lambdaRouteTo = None

    try:
        lambdaRouteFrom = getattr(motor, routeFrom)
        lambdaRouteTo = getattr(motor, routeTo)

    except AttributeError:
        raise NotImplementedError("Class `{}` does not implement `{}`".format(motor.__class__.__name__, routeTo))

    # Run time array
    easeFunctions.runEaseFunctions(lambdaRouteTo-lambdaRouteFrom,routeDuration,routeEasing)
    motor.stepsTaken = lambdaRouteTo
    return jsonify(200)
