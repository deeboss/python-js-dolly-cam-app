#!/bin/bash

FILE=/etc/wpa_supplicant

if test -f "$FILE/wpa_supplicant.conf"; then
   sudo mv $FILE/wpa_supplicant.conf $FILE/wpa_supplicant.conf.orig
   sudo /usr/bin/autohotspotN
elif test -f "$FILE/wpa_supplicant.conf.orig"; then
   sudo mv $FILE/wpa_supplicant.conf.orig $FILE/wpa_supplicant.conf
   sudo /usr/bin/autohotspotN
else
   echo "Neither .conf or .conf.orig file could be found!"
fi
