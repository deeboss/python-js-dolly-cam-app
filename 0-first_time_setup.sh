SOURCE=/home/pi/Downloads/python-dolly-cam-app
ORIGINAL=RPiHotspot
NEW=MAD-Wifi

# Install AutoHotspot
# cd /home/pi/Downloads/
# wget https://raw.githubusercontent.com/km4ack/pi-scripts/master/autohotspotN-setup
# sudo chmod +x autohotspotN-setup
# sudo ./autohotspotN-setup

# sudo sed -i -e "s/${ORIGINAL}/${NEW}/g" /etc/hostapd/hostapd.conf

# Remove the downloaded setup file now
# rm -rf /home/pi/Downloads/autohotspot-buster

# Get latest release
. ${SOURCE}/1-updater.sh

# Remove Setup now
rm -rf /home/pi/Desktop/first-time-setup.desktop
rm -rf ~/.local/share/applications/first-time-setup.desktop

zenity --info --title 'Setup Complete' --text "1st time setup has been successfully completed. The device will reboot in 5 seconds in order to initialize the settings." --width=500 --height=320 &
zpid=$!
sleep 5
kill $zpid
sudo reboot