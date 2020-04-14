import RPi.GPIO as GPIO
import time
import sys

GPIO.setmode(GPIO.BOARD)
control_pins = [7,11,13,15]

for pin in control_pins:
  GPIO.setup(pin,GPIO.OUT)
  GPIO.output(pin,0)
  
GPIO.setup(35,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)
  
step_seq = [
  [1,0,0,0],
  [1,1,0,0],
  [0,1,0,0],
  [0,1,1,0],
  [0,0,1,0],
  [0,0,1,1],
  [0,0,0,1],
  [1,0,0,1]
]


# working press to move set distance
def step_func(rotations,x,y,z,delay):
    for i in range(rotations*512):
      for step in range(x,y,z):
        for pin in range(4):
          GPIO.output(control_pins[pin], step_seq[step][pin])
        time.sleep(delay)

def forward_full():
    step_func(1,0,8,2,0.002)

def backward_full():
    step_func(1,7,-1,-2,0.002)
    
while True:
    if GPIO.input(35) == True:
        forward_full()
        sys.exit("DONE")

'''
while True:
    if GPIO.input(35) == True:
        for step in range(7,-1,-2):
            for pin in range(4):
              GPIO.output(control_pins[pin], step_seq[step][pin])
            time.sleep(0.002)
    else:
        for step in range(0,8,2):
            for pin in range(4):
              GPIO.output(control_pins[pin], step_seq[step][pin])
            time.sleep(0.002)
    time.sleep(0.01)
'''
        
GPIO.cleanup()