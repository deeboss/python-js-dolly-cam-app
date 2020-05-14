import RPi.GPIO as GPIO
import time

GPIO.cleanup()

GPIO.setmode(GPIO.BOARD)
GPIO.setup(11,GPIO.OUT) # direction
GPIO.setup(13,GPIO.OUT) # step
GPIO.output(11,True)

x=5000

for i in range(0,3000):
    print(x)
    for j in range(0,5):
        GPIO.output(13,True)
        time.sleep(x/1000000)
        GPIO.output(13,False)
        if x>150:
            x-=1