'''
Each step the motor takes the following data needs to be recorded:
1. step number
2. time stamp
3. servo angle input

From this the actual angle of the servo can be calculated from the servo speed and time stamp.

This module simulates an input of 20 degrees for 1 second then an input of 10 degrees for another 1 second.
'''

import time

servoSpeed = 20 # deg/s
array = []
lol = []

t0 = time.time()
inputAngle = [20] * 10 + [10] * 10
actualAngle = 0


for i in range(0,20):
    t = time.time()-t0  # current time

    if abs(actualAngle-inputAngle[i])>0.5:  # half a degree tolerence
        try:
            actualAngle += (servoSpeed * (t-array[i-1][3])) * (abs(inputAngle[i]-actualAngle)/(inputAngle[i]-actualAngle))
        except:
            actualAngle = 0

    array.append([i+1,inputAngle[i],actualAngle,t])
    lol.append([inputAngle[i],actualAngle])
    time.sleep(0.1)

print(lol)