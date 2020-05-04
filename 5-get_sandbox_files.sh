TARGET=/home/pi/Downloads/python-dolly-cam-app
MENU=/home/pi/.local/share/applications
DESKTOP=/home/pi/Desktop
APPLICATION=/home/pi/Downloads/python-dolly-cam-app

cd ${TARGET}

echo "Remove any incidental changes made to the files so that we can pull properly"
git checkout -- .

echo "Pulling for any changes made to the sandbox files from the Sandbox branch"
git pull origin sandbox:master

cat <<EOF > /home/pi/Downloads/python-dolly-cam-app/update-sandbox.desktop
[Desktop Entry]
Version=1.0
Name=Get Sandbox
Comment=Gets latest Sandbox file
Exec=bash -c '. /home/pi/Downloads/python-dolly-cam-app/5-get_sandbox_files.sh;$SHELL'
Icon=/usr/share/icons/HighContrast/256x256/apps/system-software-update.png
Terminal=true 
Type=Application
Categories=Application;
EOF

cat <<EOF > /home/pi/Downloads/python-dolly-cam-app/run-servo.desktop
[Desktop Entry]
Version=1.0
Name=Run Servo Tests
Comment=Run Sandbox
Exec=bash -c '. /home/pi/Downloads/python-dolly-cam-app/6-run_sandbox_file.py;$SHELL'
Icon=/usr/share/icons/HighContrast/256x256/apps/system-software-update.png
Terminal=true 
Type=Application
Categories=Application;
EOF

echo "Moving the generated Desktop Shortcut to the appropriate applications menu"
mv ${APPLICATION}/update-sandbox.desktop ${MENU}/update-sandbox.desktop
mv ${APPLICATION}/run-servo.desktop ${MENU}/run-servo.desktop

echo "Creating a copy to the desktop to make it more easily accessible"
cp -p ${MENU}/update-sandbox.desktop ${DESKTOP}/update-sandbox.desktop
cp -p ${MENU}/run-servo.desktop ${DESKTOP}/run-servo.desktop

echo "Complete!"