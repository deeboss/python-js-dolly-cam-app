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

        print(self.stepsTaken)
                
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
        if self.stepsTaken > 0:
            sign = 1
            direction = False
        elif self.stepsTaken < 0:
            sign = -1
            direction = True
        else:
            return jsonify("OK")

        for i in range(0,self.stepsTaken,sign):
            GPIO.output(11,direction)
            GPIO.output(13,True)
            time.sleep(self.idelay)
            GPIO.output(13,False)
            time.sleep(0.001)

        self.stepsTaken = 0
        