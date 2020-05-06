"""
Stepper Class from Models Module
"""
import time
import RPi.GPIO as GPIO
from .easingFunctions import easeFunctions
easeFunctions=easeFunctions()

################### MOTOR CLASS ####################
class Motor:
    
    # Initialize variables
    def __init__(self):
        self.motorMove = False
        self.stepsTaken = 0
        self.waypointOneSteps = 'N/A'
        self.waypointTwoSteps = 'N/A'
        self.waypointThreeSteps = 'N/A'
        self.delay = 0.001
    
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
            return
        elif (self.stepsTaken == waypointSteps):
            print("Already at that waypoint!")
            return

        easeFunctions.runEaseFunctions(waypointSteps-self.stepsTaken,(waypointSteps-self.stepsTaken)/800,'Linear')
        self.stepsTaken=waypointSteps
    
    # Rewind to starting point
    def Rewind(self):
        if self.stepsTaken == 0:
            print("Already at origin point!")
            return

        easeFunctions.runEaseFunctions(self.stepsTaken,self.stepsTaken/800,'Linear')
        self.stepsTaken = 0
        