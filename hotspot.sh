#!/bin/bash

FILE=/etc/wpa_supplicant
HOME=/home/pi/Documents/python-dolly-cam-app

# Start hotspot
if test -f "$FILE/wpa_supplicant.conf"; then
   sudo mv $FILE/wpa_supplicant.conf $FILE/wpa_supplicant.conf.orig
   sudo /usr/bin/autohotspotN
   echo gpio | sudo tee /sys/class/leds/led0/trigger
   echo 1 | sudo tee /sys/class/leds/led0/brightness
elif test -f "$FILE/wpa_supplicant.conf.orig"; then
   sudo mv $FILE/wpa_supplicant.conf.orig $FILE/wpa_supplicant.conf
   sudo /usr/bin/autohotspotN
   echo input | sudo tee /sys/class/leds/led0/trigger
else
   echo "Neither .conf or .conf.orig file could be found!"
fi
