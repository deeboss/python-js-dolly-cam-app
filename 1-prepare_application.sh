#!/bin/bash

cd /home/pi/Documents/python-dolly-cam-app/

# Create Venv
python3 -m venv venv

# Initialize Venv
source venv/bin/activate

# Install required packages
pip3 install -r requirements.txt