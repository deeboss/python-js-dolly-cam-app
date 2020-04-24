ORIGINAL=RPiHotspot
NEW=MAD-Wifi

# Install AutoHotspot
cd /home/pi/Downloads/
wget https://raw.githubusercontent.com/km4ack/pi-scripts/master/autohotspotN-setup
sudo chmod +x autohotspotN-setup
sudo ./autohotspotN-setup

sed -i -e "s/${ORIGINAL}/${NEW}/g" /etc/hostapd/hostapd.conf