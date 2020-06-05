import RPi.GPIO as GPIO
import time

GPIO.cleanup()

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(3,GPIO.OUT)

delay1 = 0.1
delay2 = 0.3

for i in range(0,3):

   for i in range(0,3):
      GPIO.output(3, GPIO.HIGH)
      time.sleep(delay1)
      GPIO.output(3, GPIO.LOW)
      time.sleep(delay1)

   time.sleep(0.2)

   for i in range(0,3):
      GPIO.output(3, GPIO.HIGH)
      time.sleep(delay2)
      GPIO.output(3, GPIO.LOW)
      time.sleep(delay2)

   time.sleep(0.2)

   for i in range(0,3):
      GPIO.output(3, GPIO.HIGH)
      time.sleep(delay1)
      GPIO.output(3, GPIO.LOW)
      time.sleep(delay1)

   time.sleep(1)