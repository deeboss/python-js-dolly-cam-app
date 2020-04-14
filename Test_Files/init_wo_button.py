import os
import sys


# Turn on hotspot
os.system("/home/pi/Documents/python-dolly-cam-app/hotspot.sh")

# Turn on venv and run server
os.system("/home/pi/Documents/python-dolly-cam-app/app.py")

# Turn off hotspot after closing server
os.system("/home/pi/Documents/python-dolly-cam-app/hotspot.sh")
