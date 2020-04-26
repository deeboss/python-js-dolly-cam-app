#!/bin/bash
# Check for ENV
. 00-env.sh

FILE=/etc/wpa_supplicant
HOME=/home/pi/${ENV_PATH}/python-dolly-cam-app


# Toggle hotspot
# ToggleHotSpot()
# {
#    if test -f "$FILE/wpa_supplicant.conf"; then
#       sudo mv $FILE/wpa_supplicant.conf $FILE/wpa_supplicant.conf.orig
#       sudo /usr/bin/autohotspotN
#       echo gpio | sudo tee /sys/class/leds/led0/trigger
#       echo 1 | sudo tee /sys/class/leds/led0/brightness
#    elif test -f "$FILE/wpa_supplicant.conf.orig"; then
#       sudo mv $FILE/wpa_supplicant.conf.orig $FILE/wpa_supplicant.conf
#       sudo /usr/bin/autohotspotN
#       echo input | sudo tee /sys/class/leds/led0/trigger
#    else
#       echo "Neither .conf or .conf.orig file could be found!"
#    fi
# }

# ToggleHotSpot

cd /home/pi/${ENV_PATH}/python-dolly-cam-app
source venv/bin/activate

zenity --info --title 'Application Running' --text "MAD-ONE App is successfully running and can be accessed via your Phone or Desktop. Just connect to the Device's Wifi Network and open '10.10.10.10:5000' on your browser of choice." --width=500 --height=320 &
zpid=$!
python3 api/v1/app.py
sleep 1
kill $zpid

deactivate

# ToggleHotSpot

zenity --info --title 'Application Closed' --text "MAD-ONE App has successfully shut down." --width=500 --height=150 --timeout=5