"""
Easing Functions Class
"""

import time
import math
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
    def kConst(self,difference,duration,easingType):
        
        # Polynomial
        if self.easingDict[easingType][0]=='polynomial':
            self.degree=self.easingDict[easingType][1]
            return(abs(difference)/(duration**self.degree))
        
        # Others
        
    # Calculate timestamp of given step
    def timeStep(self,step,k):
        
        # Polynomial
        if self.easingDict[easingType][0]=='polynomial':
            return((step/k)**(1/self.degree))
        
        # Others
    
    # Calculate easeIn and easeOut timestamps
    def easingFunc(self,difference,duration,easingType):
        
        # Calculate k constant
        k=self.kConst(difference,duration,easingType)

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
            easeIn.extend([self.timeStep(i,k)])
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
    def runEaseFunctions(self,difference,arr):
        startTime = time.time()
        step=1
        while step <= abs(difference):
            if arr[step-1] <= time.time()-startTime:
                GPIO.output(13,True)
                GPIO.output(13,False)
                step+=1 



