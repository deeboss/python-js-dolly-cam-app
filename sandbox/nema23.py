import RPi.GPIO as GPIO
import time

GPIO.setwarnings(False)

GPIO.setmode(GPIO.BOARD)
GPIO.setup(11,GPIO.OUT)

for i in range(0,400):
    GPIO.output(11,GPIO.HIGH)
    time.sleep(0.01)
    GPIO.output(11,GPIO.LOW)