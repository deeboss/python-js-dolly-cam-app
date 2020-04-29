import time
import math
import RPi.GPIO as GPIO

# Initialize pins
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11,GPIO.OUT) # direction
GPIO.setup(13,GPIO.OUT) # step
GPIO.setup(23,GPIO.OUT) # microstep 1
GPIO.output(11,True)
GPIO.output(23,True)

# Distance specifications
startStep = 0 # starting step number
endStep = 12000 # ending step number
duration = 6 # duration of ease
easeDegree = 'linear'

## POLYNOMIALS ###
if easeDegree == 'linear':
    k=(endStep-startStep)/(duration) # CHANGES FROM EQUATION
    def stepTime(step,k):
        return (step/k)
elif easeDegree == 'quadratic':
    k=(endStep-startStep)/(duration**2) # CHANGES FROM EQUATION
    def stepTime(step,k):
        return (step/k)**(1/2)
elif easeDegree == 'cubic':
    k=(endStep-startStep)/(duration**3)
    def stepTime(step,k):
        return (step/k)**(1/3)

# Calculate times for EaseIn
EaseIn=[]
for i in range(startStep,endStep):
    EaseIn.extend([stepTime(i+1,k)])

# Calculate times for EaseOut
EaseOut=[]
for i in reversed(EaseIn):
    if duration-i < 0:
        EaseOut.extend([0])
    else:
        EaseOut.extend([duration-i])
print(EaseIn)
print(EaseOut)
'''
# Executing EaseIn
startTime = time.time()
step=1
while step <= endStep:
    if EaseIn[step-1] <= time.time()-startTime:
        GPIO.output(13,True)
        GPIO.output(13,False)
        step+=1 


# Executing EaseOut
startTime = time.time()
step=1
while step <= endStep:
    if EaseOut[step-1] <= time.time()-startTime:
        GPIO.output(13,True)
        GPIO.output(13,False)
        step+=1
'''
        
GPIO.cleanup()
    


