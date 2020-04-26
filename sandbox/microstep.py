import os
import sys
import time
import RPi.GPIO as GPIO

# Initialize pins
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11,GPIO.OUT) # direction
GPIO.setup(13,GPIO.OUT) # step
GPIO.setup(19,GPIO.OUT) # microstep 1
GPIO.setup(21,GPIO.OUT) # microstep 2
GPIO.setup(23,GPIO.OUT) # microstep 3


GPIO.output(11,True)
GPIO.output(19,False)
GPIO.output(21,False)
GPIO.output(23,False)

'''
delay = [0.128,0.064,0.032,0.016,0.008,0.004,0.002,0.001,0.0005]
print(delay)
for i in delay:
    GPIO.output(13,True)
    GPIO.output(13,False)
    time.sleep(i)
'''

for j in range(0,3200):
    GPIO.output(13,True)
    time.sleep(0.0002)
    GPIO.output(13,False)
    time.sleep(0.0008)
    
GPIO.cleanup()
    

