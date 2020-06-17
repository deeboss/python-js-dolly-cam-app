"""
Easing Functions Class
"""

import time
import math
import eventlet
import RPi.GPIO as GPIO

# Initialize pins
GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(11,GPIO.OUT) # direction
GPIO.setup(13,GPIO.OUT) # step
GPIO.setup(23,GPIO.OUT) # microstep 1
GPIO.output(11,True)
GPIO.output(23,True)

class easeFunctions:

    def __init__(self):

        self.easingDict = {
            # Linear
            'Linear':['polynomial',1,'In'],
            
            # Quadratic
            'QuadraticIn':['polynomial',2,'In'],
            'QuadraticOut':['polynomial',2,'Out'],
            'QuadraticInOut':['polynomial',2,'InOut'],
            
            # Cubic
            'CubicIn':['polynomial',3,'In'],
            'CubicOut':['polynomial',3,'Out'],
            'CubicInOut':['polynomial',3,'InOut'],
            
            # Quartic
            'QuarticIn':['polynomial',4,'In'],
            'QuarticOut':['polynomial',4,'Out'],
            'QuarticInOut':['polynomial',4,'InOut'],
            
            # Quintic
            'QuinticIn':['polynomial',5,'In'],
            'QuinticOut':['polynomial',5,'Out'],
            'QuinticInOut':['polynomial',5,'InOut'],
            
            }
        
    # Initialize k-constant for polynomial functions
    def kConst(self):
        
        # Polynomial
        if self.easingDict[self.easingType][0]=='polynomial':
            self.degree=self.easingDict[self.easingType][1]
            return(abs(self.difference)/(self.duration**self.degree))
        
        # Others
        
    # Calculate timestamp of given step
    def timeStep(self,step):
        
        # Polynomial
        if self.easingDict[self.easingType][0]=='polynomial':
            return((step/self.k)**(1/self.degree))
        
        # Others
    
    # Calculate easeIn and easeOut timestamps
    def easingFunc(self,difference,duration,easingType):
        
        self.easingType=easingType
        self.difference=abs(difference)
        self.duration=duration
        
        # Calculate k constant
        self.k=self.kConst()

        # Linear with easing smooth
        if self.easingType=='Linear':
            k1=18000
            t1=(-self.duration+((self.duration**2)-4*(self.difference/(2*k1)))**(1/2))/-2
            k2=2*t1*k1
            t2=self.duration-t1
            d1=k1*(t1**2)
            d2=self.difference-d1

            arr=[]
            for i in range(0,self.difference):
                if i <= d1:
                    arr.extend([(i/k1)**(1/2)])
                elif d1 < i < d2:
                    arr.extend([(i-(k1*(t1**2))+k2*t1)/k2])
                elif i >= d2:
                    arr.extend([self.duration-(((self.difference-i)/k1)**(1/2))])
            return arr

        # EaseInOut
        if self.easingDict[easingType][2]=='InOut':
            
            # Dividng steps into two halves
            firstHalf=math.ceil(abs(difference)/2)
            secondHalf=abs(difference)-math.ceil(abs(difference)/2)
            
            # Calculating timing
            a=self.easingFunc(firstHalf,round(duration/2),easingType.replace('InOut','In'))
            b=self.easingFunc(secondHalf,round(duration/2),easingType.replace('InOut','Out'))
            b=[x+round(duration/2) for x in b]
            return a+b
        
        # EaseIn
        easeIn=[]
        for i in range(0,abs(difference)):
            easeIn.extend([self.timeStep(i)])
        if self.easingDict[easingType][2]=='In':
            return easeIn
        
        # EaseOut (based on EaseIn calculations)
        easeOut=[]
        for i in reversed(easeIn):
            if duration-i < 0:
                easeOut.extend([0])
            else:
                easeOut.extend([duration-i])
        return easeOut
                
    # Run easing function on motor
    def runEaseFunctions(self,difference,duration,easingType):

        # Compute time array
        arr=self.easingFunc(difference,duration,easingType)

        # Set direction
        if difference > 0:
            GPIO.output(11,True)
        elif difference < 0:
            GPIO.output(11,False)

        # Run time array
        startTime = time.time()
        step=1
        while step <= abs(difference):
            if arr[step-1] <= time.time()-startTime:
                GPIO.output(13,True)
                GPIO.output(13,False)
                step+=1
                eventlet.sleep(0)

    def stepsDurationCheck(self,difference,duration,easingType):

        # Max RPM input (can be changed later on)
        maxRPM=2000

        checkDegree=self.easingDict[self.easingType][1]
        if self.easingDict[self.easingType][2]=='InOut':
            duration/=2
            difference/=2

        # Polynomial
        if self.easingDict[self.easingType][0]=='polynomial':
            RPM=(80/6)*(checkDegree/duration)*abs(difference)

        # Others

        # Check RPM
        if RPM > maxRPM:
            print('TOO FAST')
            possibleTime=(80/6)*(checkDegree/maxRPM)*abs(difference)
            possibleDistance=maxRPM*(6/80)*(duration/checkDegree)
            print(possibleTime)
            print(possibleDistance)



