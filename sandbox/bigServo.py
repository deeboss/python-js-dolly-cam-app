from adafruit_servokit import ServoKit 
import time
kit = ServoKit(channels=16)

kit.servo[0].set_pulse_width_range(1000, 2000)

kit.servo[0].angle = 0
time.sleep(2)
kit.servo[0].angle = 90
