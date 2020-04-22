import os
import sys
import RPi.GPIO as GPIO
import time

'''
# Create venv and install packages if they do not exist
if not os.path.exists("/home/pi/venv"):
    os.system("python3 -m venv venv)
    os.system("pip install -r requirements.txt")
'''

GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

while True:
   if GPIO.input(18) == True:
      # Turn on hotspot
      os.system("/home/pi/Documents/python-dolly-cam-app/hotspot.sh")

      # Turn on venv and run server
      os.system("/home/pi/Documents/python-dolly-cam-app/api/app.py")

      # Turn off hotspot after closing server
      os.system("/home/pi/Documents/python-dolly-cam-app/hotspot.sh")

      sys.exit("Finished!")

   time.sleep(0.1)
