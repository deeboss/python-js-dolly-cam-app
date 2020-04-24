SOURCE=/home/pi/Documents/python-dolly-cam-app
TARGET=~/.local/share/applications
DESKTOP=/home/pi/Desktop/
cat <<EOF > /home/pi/Documents/python-dolly-cam-app/run-application.desktop
[Desktop Entry]
Version=1.0
Name=Run MAD        
Comment=Runs MAD application
Exec=bash -c '. /home/pi/Documents/python-dolly-cam-app/2-run_application.sh;$SHELL'
Icon=/usr/share/icons/HighContrast/256x256/apps/gnome-tweak-tool.png
Terminal=false 
Type=Application
Categories=Application;
EOF

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


mv ${SOURCE}/run-application.desktop ${TARGET}/run-application.desktop
mv ${SOURCE}/update-application.desktop ${TARGET}/update-application.desktop

cp -p ${TARGET}/run-application.desktop ${DESKTOP}/run-application.desktop
cp -p ${TARGET}/update-application.desktop ${DESKTOP}/update-application.desktop