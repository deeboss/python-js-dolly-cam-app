import os
import sys

'''
# Create venv and install packages if they do not exist
if not os.path.exists("/home/pi/venv"):
    os.system("python3 -m venv venv)
    os.system("pip install -r requirements.rpi.text")
'''

# Turn on hotspot
os.system("/home/pi/Documents/python-dolly-cam-app/hotspot.sh")

# Turn on venv and run server
os.system("/home/pi/Documents/python-dolly-cam-app/app.py")
