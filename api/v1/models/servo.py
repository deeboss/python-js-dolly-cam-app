import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(12,GPIO.OUT)

'''
servo link:
https://www.savoxusa.com/collections/brushless-servos/products/savsb2270sg-hv-bl-digital-servo-12-444#technical-details
'''

class Servo:

# Note: period is in seconds while minimum/maximum/neutral inputs are in microseconds (10e-6 seconds)

    def __init__(self,frequency,neutral,minimum,maximum):
        self.frequency=frequency
        self.neutral=neutral
        self.minimum=minimum
        self.maximum=maximum

        self.pwm=GPIO.PWM(12,frequency)
        self.pwm.start(0)
        self.period=(1/frequency)*1000000 # in microseconds

    def updateValues(self,frequency,minimum,neutral,maximum)

        # Update frequency and period
        self.pwm.ChangeFrequency(self.frequency)
        self.period=(1/self.frequency)*1000000

        # Update test points
        self.minimum=minimum
        self.maximum=maximum
        self.neutral=neutral

    def goNeutral(self):
        # Go to neutral position
        DC=(self.neutral/self.period)*100
        print("Neutral position: ",self.neutral)
        print("Duty cycle: ",DC)
        self.pwm.ChangeDutyCycle(DC)

    def goMinimum(self):
        # Go to minimum position
        DC=(self.minimum/self.period)*100
        print("Minimum position: ",self.minimum)
        print("Duty cycle: ",DC)
        self.pwm.ChangeDutyCycle(DC)

    def goMaximum(self):
        # Go to maximum position
        DC=(self.maximum/self.period)*100
        print("Maximum position: ",self.maximum)
        print("Duty cycle: ",DC)
        self.pwm.ChangeDutyCycle(DC)