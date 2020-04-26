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


GPIO.output(11,True)
GPIO.output(19,True)
GPIO.output(21,True)
GPIO.output(23,False)

delay = 0.00006

for i in range(0,6000):
    GPIO.output(13,True)
    GPIO.output(13,False)
    time.sleep(delay)
    

