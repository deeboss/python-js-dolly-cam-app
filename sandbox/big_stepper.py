import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)

# Initialize pins
GPIO.setup(11,GPIO.OUT) # direction
GPIO.setup(12,GPIO.OUT)
p = GPIO.PWM(12,1000)
time=0
while True:
    p.start(25)
    


GPIO.cleanup()