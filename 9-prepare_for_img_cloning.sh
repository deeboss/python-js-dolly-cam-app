SOURCE=/home/pi/Documents/python-dolly-cam-app
MENU=~/.local/share/applications
DESKTOP=/home/pi/Desktop
APPLICATION=/home/pi/Downloads/python-dolly-cam-app

# Delete all content in Downloads folder
sudo rm -r /home/pi/Downloads/*

# Get latest release
. ${SOURCE}/2-updater.sh

cat <<EOF > /home/pi/Downloads/python-dolly-cam-app/first-time-setup.desktop
[Desktop Entry]
Version=1.0
Name=Setup        
Comment=Sets up environment and application for MAD for 1st time use
Exec=bash -c '. /home/pi/Downloads/python-dolly-cam-app/1-first_time_setup.sh;$SHELL'
Icon=/usr/share/icons/HighContrast/256x256/categories/preferences-other.png
Terminal=true 
Type=Application
Categories=Application;
EOF

cat <<EOF > /home/pi/Downloads/python-dolly-cam-app/update-application.desktop
[Desktop Entry]
Version=1.0
Name=Update MAD        
Comment=Updates MAD application
Exec=bash -c '. /home/pi/Downloads/python-dolly-cam-app/2-updater.sh;$SHELL'
Icon=/usr/share/icons/HighContrast/256x256/apps/system-software-update.png
Terminal=false 
Type=Application
Categories=Application;
EOF

cat <<EOF > /home/pi/Downloads/python-dolly-cam-app/run-application.desktop
[Desktop Entry]
Version=1.0
Name=Run MAD        
Comment=Runs MAD application
Exec=bash -c '. /home/pi/Downloads/python-dolly-cam-app/3-run_application.sh;$SHELL'
Icon=/usr/share/icons/HighContrast/256x256/apps/gnome-tweak-tool.png
Terminal=false 
Type=Application
Categories=Application;
EOF


# Move the generated Desktop Shortcut to the appropriate applications menu
mv ${APPLICATION}/run-application.desktop ${MENU}/run-application.desktop
mv ${APPLICATION}/update-application.desktop ${MENU}/update-application.desktop

# Create a copy to the desktop to make it more easily accessible
cp -p ${MENU}/run-application.desktop ${DESKTOP}/run-application.desktop
cp -p ${MENU}/update-application.desktop ${DESKTOP}/update-application.desktop

# Remove networks
for i in {0..5}
do
   wpa_cli remove_network i
done

sudo rm -rf /usr/bin/autohotspotN
sudo rm -rf /etc/hostapd/hostapd.conf



# Delete developer repo
sudo rm -rf ${SOURCE}