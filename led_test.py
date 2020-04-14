import RPi.GPIO as GPIO
import time
import os
import sys

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(19,GPIO.OUT)
GPIO.setup(18,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)

while True:
   if GPIO.input(18) == True:
      GPIO.output(19, GPIO.HIGH)
   else:
      GPIO.output(19, GPIO.LOW)
time.sleep(0.1)

'''
for i in range(0,3):
   print("LED on")
   GPIO.output(19, GPIO.HIGH)
   time.sleep(1)
   print("LED off")
   GPIO.output(19, GPIO.LOW)
   time.sleep(1)
'''
