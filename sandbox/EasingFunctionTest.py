import time
import math
import RPi.GPIO as GPIO

GPIO.cleanup()

# Initialize pins
GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(11,GPIO.OUT) # direction
GPIO.setup(13,GPIO.OUT) # step
GPIO.setup(23,GPIO.OUT) # microstep 1
GPIO.output(11,True)
GPIO.output(23,True)


## POLYNOMIALS ###

class easeFunctions:
    
    def __init__(self):
    
        # Linear
        self.easingDict ={'Linear':['polynomial',1,'In']}

        # Quadratic
        self.easingDict['QuadraticIn']=['polynomial',2,'In']
        self.easingDict['QuadraticOut']=['polynomial',2,'Out']
        self.easingDict['QuadraticInOut']=['polynomial',2,'InOut']

        # Cubic
        self.easingDict['CubicIn']=['polynomial',3,'In']
        self.easingDict['CubicOut']=['polynomial',3,'Out']
        self.easingDict['CubicInOut']=['polynomial',3,'InOut']

        # Quartic
        self.easingDict['QuarticIn']=['polynomial',4,'In']
        self.easingDict['QuarticOut']=['polynomial',4,'Out']
        self.easingDict['QuarticInOut']=['polynomial',4,'InOut']

        # Quintic
        self.easingDict['QuinticOut']=['polynomial',5,'Out']
        self.easingDict['QuinticInOut']=['polynomial',5,'InOut']
        self.easingDict['QuinticIn']=['polynomial',5,'In']

    
    # Initialize k-constant for polynomial functions
    def kConst(self,difference,duration,easingType):
        
        # K-constant for polynomial
        if self.easingDict[easingType][0]=='polynomial':
            self.degree=self.easingDict[easingType][1]
            return(abs(difference)/(duration**self.degree))
        
        # K-constant for other types of easing functions
        
        ###
        
    # Calculate timestamp of given step
    def timeStep(self,step,k):
        if self.easingDict[easingType][0]=='polynomial':
            return((step/k)**(1/self.degree))
    
    # Calculate easeIn and easeOut timestamps
    def easingFunc(self,difference,duration,easingType):
        
        # Calculate k constant
        k=self.kConst(difference,duration,easingType)

        # Recursive call to In and Out
        if self.easingDict[easingType][2]=='InOut':
            a=self.easingFunc(math.ceil(abs(difference)/2),round(duration/2),easingType.replace('InOut','In'))
            b=self.easingFunc(abs(difference)-math.ceil(abs(difference)/2),round(duration/2),easingType.replace('InOut','Out'))
            b=[x+round(duration/2) for x in b]
            return a+b
        
        # EaseIn
        easeIn=[]
        for i in range(0,abs(difference)):
            easeIn.extend([self.timeStep(i,k)])
        
        if self.easingDict[easingType][2]=='In':
            return easeIn
        
        # EaseOut, based on EaseIn calculations
        easeOut=[]
        for i in reversed(easeIn):
            if duration-i < 0:
                easeOut.extend([0])
            else:
                easeOut.extend([duration-i])
                
        return easeOut
                
    # Function to run time array
    def runEaseFunctions(self,difference,arr):
        startTime = time.time()
        step=1
        while step <= abs(difference):
            if arr[step-1] <= time.time()-startTime:
                GPIO.output(13,True)
                GPIO.output(13,False)
                step+=1 

# Testing code
easeFunctions=easeFunctions()
# Distance specifications
startStep = -1001 # starting step number
endStep = 4000 # ending step number
duration = 4 # duration of ease
easingType='QuadraticInOut'

timeArray=easeFunctions.easingFunc(endStep-startStep,duration,easingType)
#timeArray=easeFunctions(startStep,endStep,duration,easeType)
print(abs(endStep-startStep))
print(len(timeArray))
print(timeArray)

easeFunctions.runEaseFunctions(endStep-startStep,timeArray)