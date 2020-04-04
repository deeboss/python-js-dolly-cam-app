import RPi.GPIO as GPIO    # Import Raspberry Pi GPIO library
import os
import sys
import time     # Import the sleep function from the time module

os.system("sudo echo gpio | sudo tee /sys/class/leds/led0/trigger")
while True:
    os.system("echo 1 | sudo tee /sys/class/leds/led1/brightness")
    time.sleep(1)
    os.system("echo 0 | sudo tee /sys/class/leds/led1/brightness")
    time.sleep(1)
