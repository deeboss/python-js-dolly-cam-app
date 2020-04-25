SOURCE=/home/pi/Documents/python-dolly-cam-app
MENU=~/.local/share/applications
DESKTOP=/home/pi/Desktop
APPLICATION=/home/pi/Documents/python-dolly-cam-app

# Delete shortcuts
sudo rm -r ~/.local/share/applications/* 
# sudo rm -r /home/pi/Desktop/* 


cat <<EOF > /home/pi/Documents/python-dolly-cam-app/update-application.desktop
[Desktop Entry]
Version=1.0
Name=Update MAD        
Comment=Updates MAD application
Exec=bash -c '. /home/pi/Documents/python-dolly-cam-app/1-updater.sh;$SHELL'
Icon=/usr/share/icons/HighContrast/256x256/apps/system-software-update.png
Terminal=false 
Type=Application
Categories=Application;
EOF

cat <<EOF > /home/pi/Documents/python-dolly-cam-app/run-application.desktop
[Desktop Entry]
Version=1.0
Name=Run MAD        
Comment=Runs MAD application
Exec=bash -c '. /home/pi/Documents/python-dolly-cam-app/2-run_application.sh;$SHELL'
Icon=/usr/share/icons/HighContrast/256x256/apps/gnome-tweak-tool.png
Terminal=true 
Type=Application
Categories=Application;
EOF

# Move the generated Desktop Shortcut to the appropriate applications menu
mv ${APPLICATION}/run-application.desktop ${MENU}/run-application.desktop
mv ${APPLICATION}/update-application.desktop ${MENU}/update-application.desktop

# Create a copy to the desktop to make it more easily accessible
cp -p ${MENU}/run-application.desktop ${DESKTOP}/run-application.desktop
cp -p ${MENU}/update-application.desktop ${DESKTOP}/update-application.desktop