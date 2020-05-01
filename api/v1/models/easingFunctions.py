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

## POLYNOMIALS ###

class easeFunctions:
    
    '''
    # easeTyp char:
    0 - Linear
    
    1 - Quadratic In
    2 - Cubic In
    3 - Quartic In
    4 - Quintic In
    
    5 - Quadratic Out
    6 - Cubic Out
    7 - Quartic Out
    8 - Quaintic Out
    
    9 - Quadratic In Out
    10 - Cubic In Out
    11 - Quartic In Out
    12 - Quintic In Out
    
    
    def __init__(startStep,endStep,duration,easeType):
        
    # Outputs k-constant value
    def kConst(self,startStep,endStep,easeType):
    
        # Linear
        if easeType=0:
            self.degree==1
            self.motion='In'
        
        # Polynomial
        if 1 <= easeType <= 12:
        
            if 0 <= easeType <= 4:
                self.motion='In'
            elif 5 <= easeType <=8:
                self.motion='Out'
            elif 9 <= easeType <= 12:
                self.motion='InOut'
                
            if easeType=1 or easeType=5 or easeType=9:
                self.degree=2
            elif easeType=2 or easeType=6 or easeType=10:
                self.degree=3
            elif easeType=3 or easeType=7 or easeType=11:
                self.degree=4
            elif easeType=4 or easeType=8 or easeType=12:
                self.degree=5
            
            # Calculate K
            self.k=(endStep-startStep)/(duration**self.degree)
            
    def easeFunctionCall(self):
        # Initialize k-constant
        kConst(startStep,endStep,easeType)
        
    '''
    
 # Initialize k-constant for polynomial functions
    def kConst(self,difference,duration,easeType):
        if easeType == 'linear':
            self.degree=1
        elif easeType == 'quadratic':
            self.degree=2
        elif easeType == 'cubic':
            self.degree=3
        elif easeType == 'quartic':
            self.degree=4
        elif easeType == 'quintic':
            self.degree=5
        return(abs(difference)/(duration**self.degree))
        
        
    # Calculate timestamp of given step
    def polyTimeStep(self,step,k):
        return((step/k)**(1/self.degree))


    # Calculate easeIn and easeOut timestamps
    def easeInOrEaseOut(self,difference,duration,easeType,inOrOut):
        
        # Calculate k constant
        k=self.kConst(difference,duration,easeType)
        
        # EaseIn
        easeIn=[]
        for i in range(0,abs(difference)):
            easeIn.extend([self.polyTimeStep(i,k)])
            
        # EaseOut
        easeOut=[]
        for i in reversed(easeIn):
            if duration-i < 0:
                easeOut.extend([0])
            else:
                easeOut.extend([duration-i])
                
        # Save to class
        if inOrOut == 'In':
            return easeIn
        elif inOrOut == 'Out':
            return easeOut
        
        
    # Calculate easeIn and easeOut timestamps
    def easeInOut(self,difference,duration,easeType):

        # Call easeIn and easeOut functions at half values, with easeOut one step higher for odd steps
        easeIn=self.easeInOrEaseOut(math.ceil(abs(difference)/2),round(duration/2),easeType,'In')
        easeOut=self.easeInOrEaseOut(abs(difference)-math.ceil(abs(difference)/2),round(duration/2),easeType,'Out')
        easeOut=[x+round(duration/2) for x in easeOut]

        return(easeIn+easeOut)

    def runEaseFunctions(self,difference,arr):
        if difference > 0:
            GPIO.output(11,True)
        elif difference < 0:
            GPIO.output(11,False)
        startTime = time.time()
        step=1
        while step <= abs(difference):
            if arr[step-1] <= time.time()-startTime:
                GPIO.output(13,True)
                GPIO.output(13,False)
                step+=1
        

'''

timeArray=easeFunctions.easeInOut(startStep,endStep,duration,easeType)

# Executing timeArray
startTime = time.time()
step=1

if (endStep-startStep) > 0:
    GPIO.output(11,True)
elif (endStep-startStep) < 0:
    GPIO.output(11,False)

while step <= abs(endStep-startStep):
    if timeArray[step-1] <= time.time()-startTime:
        GPIO.output(13,True)
        GPIO.output(13,False)
        step+=1 



'''