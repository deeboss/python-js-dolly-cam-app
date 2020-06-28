# from adafruit_servokit import ServoKit 
# import time
# kit = ServoKit(channels=16)

class Servo:

    def moveServo(self,direction,zone):
        angle = 90 + direction*zone*18
        print("Setting turn angle to {}°".format(angle))
        # kit.servo[0].angle = angle