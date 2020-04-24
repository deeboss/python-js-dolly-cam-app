ORIGINAL=RPiHotspot
NEW=MAD-Wifi

# Install AutoHotspot
cd /home/pi/Downloads/
wget https://raw.githubusercontent.com/km4ack/pi-scripts/master/autohotspotN-setup
sudo chmod +x autohotspotN-setup
sudo ./autohotspotN-setup

sudo sed -i -e "s/${ORIGINAL}/${NEW}/g" /etc/hostapd/hostapd.conf

. ${SOURCE}/2-updater.sh

zenity --info --title 'System Reboot Required' --text "The device needs to reboot to save the configurations. Automatic reboot in 5 seconds." --width=500 --height=320 &
sleep 5
kill $zpid
sudo reboot