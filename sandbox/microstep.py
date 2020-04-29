import time
import RPi.GPIO as GPIO

# Initialize pins
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11,GPIO.OUT) # direction
GPIO.setup(13,GPIO.OUT) # step
GPIO.setup(23,GPIO.OUT) # microstep 1
GPIO.output(11,True)
GPIO.output(23,True)

# Starting frequencies
startFreq = 1000
endFreq = 4000

# Ramp up constants
rampUpTime = 0.5
timeSections = 10


speeds=[]
for t in range(0,timeSections+1):
    t /= timeSections
    c=endFreq-startFreq
    b=startFreq
    speeds.extend([2*c*t*t+b])
print(speeds)

'''
speeds=[]
for t in range(0,timeSections+1):
    t /= timeSections
    c=endFreq-startFreq
    b=startFreq
    speeds.extend([-c*t*(t-2)+b])
print(speeds)
'''

'''
speeds=[]
for t in range(0,timeSections+1):
    t /= timeSections/2
    c=endFreq-startFreq
    b=startFreq
    if t<1:
        speeds.extend([c/2*t*t+b])
    else:
        t-=1
        speeds.extend([-c/2*(t*(t-2)-1)+b])

for k in range(0,800):
    GPIO.output(13,True)
    GPIO.output(13,False)
    time.sleep(1/startFreq)

for i in speeds:
    startTime = time.time()
    while time.time()-startTime < rampUpTime/timeSections:
        GPIO.output(13,True)
        GPIO.output(13,False)
        time.sleep(1/i)

for k in range(0,2400):
    GPIO.output(13,True)
    GPIO.output(13,False)
    time.sleep(1/endFreq)
'''
GPIO.cleanup()
    

