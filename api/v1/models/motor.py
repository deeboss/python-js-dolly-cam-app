"""
Stepper Class from Models Module
"""
import time
import eventlet
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
        self.defaultDelay = 0.001
    
    # Manual motor move
    def Move(self):

        delay=self.defaultDelay+0.001
        count = 1

        # ramp up and continuous motion portion
        while self.motorMove == True:
            # motor step
            GPIO.output(13,True)
            GPIO.output(13,False)
            time.sleep(delay)
            eventlet.sleep(0)

            # counting steps
            if GPIO.input(11) == True:
                self.stepsTaken+=1
            elif GPIO.input(11) == False:
                self.stepsTaken-=1

            # decrementing delay time for ramp up, 10 steps per ramp up delay increment
            # for loop not used in case false signal sent in between 10 steps
            if count == 10:
                if delay > self.defaultDelay:
                    delay -= 0.0001
                else:
                    delay = self.defaultDelay
                count = 1
            else:
                count += 1

        # ramp down portion
        while delay < self.defaultDelay:

            # incrementing delay time for ramp down, 10 steps per ramp down delay increment
            for i in range(0,10):

                # motor step
                GPIO.output(13,True)
                GPIO.output(13,False)
                time.sleep(delay)

                # counting steps
                if GPIO.input(11) == True:
                    self.stepsTaken+=1
                elif GPIO.input(11) == False:
                    self.stepsTaken-=1
            delay += 0.0001
            eventlet.sleep(0)

        print(self.stepsTaken)
                
    # Moving to waypoint
    def gotoWaypoint(self,waypointSteps):
        if waypointSteps == 'N/A':
            print("Waypoint has not been assigned yet!")
            return
        elif (self.stepsTaken == waypointSteps):
            print("Already at that waypoint!")
            return

        easeFunctions.runEaseFunctions(waypointSteps-self.stepsTaken,abs(waypointSteps-self.stepsTaken)/800,'Linear')
        self.stepsTaken=waypointSteps
    
    # Rewind to starting point
    def Rewind(self):
        if self.stepsTaken == 0:
            print("Already at origin point!")
            return

        easeFunctions.runEaseFunctions(self.stepsTaken,abs(self.stepsTaken)/800,'Linear')
        self.stepsTaken = 0
        