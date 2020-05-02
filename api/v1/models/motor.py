"""
Stepper Class from Models Module
"""
import os
import sys
import time
import RPi.GPIO as GPIO

################### MOTOR CLASS ####################
class Motor:
    
    # Initialize variables
    def __init__(self):
        self.motorMove = False
        self.stepsTaken = 0
        self.waypointOneSteps = 'N/A'
        self.waypointTwoSteps = 'N/A'
        self.waypointThreeSteps = 'N/A'
        self.delay = 0.0003
    
    # Manual motor move
    def Move(self):  
        while self.motorMove == True:
            GPIO.output(13,True)
            GPIO.output(13,False)
            time.sleep(self.delay)

            # counting steps
            if GPIO.input(11) == True:
                self.stepsTaken+=1
            elif GPIO.input(11) == False:
                self.stepsTaken-=1

        print(self.stepsTaken)
                
    # Moving to waypoint
    def gotoWaypoint(self,waypointSteps):
        if waypointSteps == 'N/A':
            print("Waypoint has not been assigned yet!")
            return jsonify("OK")
        elif (self.stepsTaken - waypointSteps) > 0:
            sign = 1
            direction=False
        elif (self.stepsTaken - waypointSteps) < 0:
            sign = 1
            direction=True
        elif (self.stepsTaken - waypointSteps) == 0:
            print("Already at that waypoint! Dumbass.")
            
        for i in range(self.stepsTaken,waypointSteps,sign):
            GPIO.output(11,direction)
            GPIO.output(13,True)
            GPIO.output(13,False)
            time.sleep(self.delay)
            
        self.stepsTaken=waypointSteps
    
    # Rewind to starting point
    def Rewind(self):
        if self.stepsTaken > 0:
            sign = 1
            direction = False
        elif self.stepsTaken < 0:
            sign = -1
            direction = True
        else:
            print("Already at origin point!")
            return jsonify("OK")

        for i in range(0,self.stepsTaken,sign):
            GPIO.output(11,direction)
            GPIO.output(13,True)
            GPIO.output(13,False)
            time.sleep(self.delay)

        self.stepsTaken = 0
        