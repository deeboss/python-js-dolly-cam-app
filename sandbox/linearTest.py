# Given variables
difference = 2000 # steps
duration = 1 # time

# Ramp-up method
method='acceleration'
k1=10000     # steps/s^2 (acceleration)
t1=0.1       # ramp up time

'''
The linear function provides an exponential ramp-up and -down function to resolve jolting accuracy issus.
For a given duration and steps input, a unique solution cannot be found as the equations present a family of solutions.
Therefore, an additional value must be assumed. Both an assumed ramp up time or speed can be used and is set by changing the method var.

The piecewise function for the step as a function of time is:
    {  k1*(t^2)                        ;  t < t1
d = {  k2*(t-t1) + k1*(t1^2)           ;  t1 < t < t2
    {  -k1*((t-duration)^2) + difference     ;  t > t2

These equations are constrained by the following conditions:
d1 + d2 = difference                ; total steps
t1 + t2 = duration                ; total duration
d1 = k1*(t1^2)                  ; transition at t1 must be same point
d2 = k2*(t2-t1) + k1*(t1^2)     ; trantiion at t2 must be same point
k2 = 2*t1*k1                    ; transition at t1 must have same slope

Where,
d = step
t = time
difference = number of steps
duration = duration
k1 = exponential constant
k2 = linear constant
t1 = transition time from ramp up to linear (ramp up time)
t2 = transition time from linear to ramp down
d1 = transition steps of t1
d2 = transition steps of t2

By first resolving the variables from the constraints, the timing of each step can be backsolved from the piecewise function.
Note: the resultant square root in the third piecewise is a +/-.
'''

# Solving for variables through constraints dependant on what is assumed

# Assumed ramp-up/-down time
if method=='time':
    t2=duration-t1
    k1=(difference/(2*(t1*duration-(t1**2))))
    k2=2*t1*k1
    d1=k1*(t1**2)
    d2=difference-d1

# Assumed ramp-up/-down acceleration
elif method=='acceleration':
    t1=(-duration+((duration**2)-4*(difference/(2*k1)))**(1/2))/-2
    k2=2*t1*k1
    t2=duration-t1
    d1=k1*(t1**2)
    d2=difference-d1

############# Solving for time array with piecewise function #############
try:
    arr=[]
    for i in range(0,difference):
        if i <= d1:
            arr.extend([(i/k1)**(1/2)])
        elif d1 < i < d2:
            arr.extend([(i-(k1*(t1**2))+k2*t1)/k2])
        elif i >= d2:
            arr.extend([duration-(((difference-i)/k1)**(1/2))])
except:
    print('Time and distance measure does not work. Consider increasing time or decreasing distance.')
