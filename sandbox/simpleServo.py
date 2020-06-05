import time
import RPi.GPIO as GPIO

GPIO.cleanup()

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(12,GPIO.OUT)

frequency = 333
neutral = 0.0015
minimum = 0.001
maximum = 0.002

'''
servo link:
https://www.savoxusa.com/collections/brushless-servos/products/savsb2270sg-hv-bl-digital-servo-12-444#technical-details
'''

# Set frequency
pwm = GPIO.PWM(12, frequency)
period = 1/frequency

# Set neutral position
pwm.start(neutral/period)
time.sleep(3)

# Set minimum position
pwm.ChangeDutyCycle(minimum/period)
time.sleep(3)

# Set maximum position
pwm.ChangeDutyCycle(maximum/period)
time.sleep(3)