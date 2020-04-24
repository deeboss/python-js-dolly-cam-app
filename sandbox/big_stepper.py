import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)

# Initialize pins
GPIO.setup(11,GPIO.OUT) # direction
GPIO.setup(13,GPIO.OUT) # step
GPIO.setup(15,GPIO.OUT) # sleep
GPIO.setup(16,GPIO.OUT) # reset


# First reset
GPIO.output(16,GPIO.LOW)

# Sleep
GPIO.output(15,GPIO.HIGH)

# Pseudo step (for some reason this makes the motor run smoothly after a fresh start even though motor doesn't actually rotate)
for i in range(0,200):
    GPIO.output(13,True)
    GPIO.output(13,False)
    time.sleep(0.001)

# Wake up
GPIO.setup(15,GPIO.OUT)
GPIO.output(15,GPIO.HIGH)

# Second reset
GPIO.output(16,GPIO.HIGH)


# Step forward and back
for y in range(0,3):
    for x in range(0,2):
        GPIO.output(11,x)
        for i in range(0,200):
            GPIO.output(13,True)
            GPIO.output(13,False)
            time.sleep(0.001)

GPIO.cleanup()