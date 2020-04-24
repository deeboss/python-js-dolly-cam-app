SOURCE=/home/pi/Downloads/python-dolly-cam-app
ORIGINAL=RPiHotspot
NEW=MAD-Wifi

passwd

# Install AutoHotspot
cd /home/pi/Downloads/
wget https://raw.githubusercontent.com/km4ack/pi-scripts/master/autohotspotN-setup
sudo chmod +x autohotspotN-setup
sudo ./autohotspotN-setup

sudo sed -i -e "s/${ORIGINAL}/${NEW}/g" /etc/hostapd/hostapd.conf

rm -rf /home/pi/Downloads/autohotspot-buster

# . ${SOURCE}/2-updater.sh

# echo "The device needs to reboot to save the configurations. Automatic reboot in 5 seconds."