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
    
    
    # Initialize k-constant for polynomial functions
    def kConst(self,startStep,endStep,duration,easeType):
        if easeType == 'linear':
            self.degree=1
        elif easeType == 'quadratic':
            self.degree=2
        elif easeType == 'cubic':
            self.degree=3
        elif easeType == 'quartic':
            self.degree=4
        return((endStep-startStep)/(duration**self.degree))
        
        
    # Calculate timestamp of given step
    def polyTimeStep(self,step,k):
        return((step/k)**(1/self.degree))


    # Calculate easeIn and easeOut timestamps
    def easeIn_easeOut(self,startStep,endStep,duration,easeType):
        
        # Calculate k constant
        k=self.kConst(startStep,endStep,duration,easeType)
        
        # EaseIn
        easeIn=[]
        for i in range(startStep,endStep):
            easeIn.extend([self.polyTimeStep(i,k)])
            
        # EaseOut
        easeOut=[]
        for i in reversed(easeIn):
            if duration-i < 0:
                easeOut.extend([0])
            else:
                easeOut.extend([duration-i])
                
        # Save to class
        self.easeIn=easeIn
        self.easeOut=easeOut
        
        
    # Calculate easeIn and easeOut timestamps
    def easeInOut(self,startStep,endStep,duration,easeType):
        # Call easeIn and easeOut functions at half values
        self.easeIn_easeOut(startStep,round(endStep/2),round(duration/2),easeType)
        self.easeOut = [x+round(duration/2) for x in self.easeOut]
        return(self.easeIn+self.easeOut)



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



