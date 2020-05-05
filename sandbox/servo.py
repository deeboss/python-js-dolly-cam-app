import time
import RPi.GPIO as GPIO

# Initialize servo class and GPIO
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(12,GPIO.OUT)
###########################################################################################

# Initializes servo parameters based on model
class servo:
    
    def __init__(self,servoModel):
        
        # Initialize default motor parameters
        if servoModel == 'Savox':
            self.servoModel=servoModel
            self.frequency=333 # frequency of pulses
            self.neutralPulse=1500 # duty cycle of neutral position
            self.pulseRange=[1000,2000] # duty cycle range in microseconds
            self.angleRange=100 # range of angle for servo
            self.test=test

        period=1/self.frequency
        percentageRange=[]
        for i in self.pulseRange:
            percentageRange.extend([i/(1000000*period)*100])
            
        self.denominator=self.angleRange/(percentageRange[1]-percentageRange[0])
        self.constant=percentageRange[0]
###########################################################################################


# Test class storing different tests
class test():

    def __init__(self,test,rangeTick=0):
        self.test=test
        self.rangeTick=rangeTick
        self.runTest()
    
    def setDutyCycle(self,angle):
        return (angle/servo.denominator)+servo.constant

    def runPWM(self,testPoints):
        for i in testPoints:

            if self.test=='angleRange':
                DC=i
            else:
                DC=(i/1000000)*100/(1/servo.frequency)

            print("Current duty cycle: ",round(DC),"%")
            self.pwm.ChangeDutyCycle(DC)
            input("Press enter to continue.\n")


    def runTest(self):
        
        # Initialize pwm pin
        self.pwm=GPIO.PWM(12,servo.frequency)
        self.pwm.start(0)
            
        # Extended MinMax test with maximum travel angle for the Savox motor
        if servo.servoModel == 'Savox' and self.test == 'extendedMinMax':
            testPoints=[1500,900,2100]
            self.runPWM(testPoints)
            print("Extended MinMax test for Savox done!")

        # Standard MinMax test
        elif self.test == 'minMax':
            testPoints=[servo.neutralPulse,servo.pulseRange[0],servo.pulseRange[1]]
            self.runPWM(testPoints)
            print("MinMax test for Savox done!")

        # Pulse range test
        elif self.test == 'pulseRange':
            testPoints=[servo.neutralPulse]
            for i in range(servo.pulseRange[0],servo.pulseRange[1]+self.rangeTick,self.rangeTick):
                testPoints.extend([i])
            self.runPWM(testPoints)
            print("Pulse range test for Savox done!")

        # Angle range test
        elif self.test == 'angleRange':
            testPoints=[self.setDutyCycle(servo.angleRange/2)]
            for i in range(0,servo.angleRange,self.rangeTick):
                testPoints.extend([self.setDutyCycle(i)])
            print(testPoints)
            self.runPWM(testPoints)
            print("Angle range test for Savox done!")

        # Stop pwm
        self.pwm.stop()
###########################################################################################   

# User promted inputs
print('Select servo motor model:\n  [1] Savox\n  [2] Other\n')
servoChoice = input()
if servoChoice == '1':
    servoModel='Savox'
elif servoChoice == '2':
    servoModel='Other'

print('Select servo motor model:\n  [1] MinMax\n  [2] Extended MinMax\n  [3] Pulse range\n  [4] Angle range')
testChoice=input()
if testChoice == '1':
    testModel='minMax'
elif testChoice == '2':
    testModel='extendedMinMax'
elif testChoice == '3':
    testModel='pulseRange'
    rangeTick=input('Input increment of each pulse step: ')
    rangeTick=int(rangeTick)
elif testChoice == '4':
    testModel='angleRange'
    rangeTick=input('Input increment of each angle step: ')
    rangeTick=int(rangeTick)

# Initialize servo and run test
servo=servo(servoModel)
test=test(testModel,rangeTick)