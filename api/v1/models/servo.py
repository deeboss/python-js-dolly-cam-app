import time
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(12,GPIO.OUT)

'''
servo link:
https://www.savoxusa.com/collections/brushless-servos/products/savsb2270sg-hv-bl-digital-servo-12-444#technical-details
'''

class servo:

    def __init__(self,frequency,neutral,minimum,maximum):
        self.frequency=frequency
        self.neutral=neutral
        self.minimum=minimum
        self.maximum=maximum

        self.pwm=GPIO.PWM(12,frequency)
        self.period=1/frequency

    def goNeutral():
        # Go to neutral position
        self.pwm.start(self.neutral/self.period)

    def goMinimum():
        # Go to minimum position
        self.pwm.ChangeDutyCycle(self.minimum/self.period)

    def goMaximum():
        # Go to maximum position
        self.pwm.ChangeDutyCycle(self.maximum/self.period)