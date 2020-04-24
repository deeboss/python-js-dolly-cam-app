import RPi.GPIO as GPIO
import time
import os
import sys

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(11,GPIO.OUT)
# GPIO.setup(18,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)

GPIO.output(11, GPIO.HIGH)
time.sleep(5)
GPIO.output(11, GPIO.LOW)

'''
for i in range(0,3):
   print("LED on")
   GPIO.output(19, GPIO.HIGH)
   time.sleep(1)
   print("LED off")
   GPIO.output(19, GPIO.LOW)
   time.sleep(1)
'''
