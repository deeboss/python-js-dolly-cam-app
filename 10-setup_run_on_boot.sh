cd /home/pi

# Get line number of 'exit 0' from rc.local
LINE_NUMBER=$(awk '/exit 0/{++n; if (n==2) { print NR; exit}}' /etc/rc.local)
INSERT_TARGET="$((LINE_NUMBER - 1))"

# Copy temporarily to Desktop
sudo sed "${INSERT_TARGET}a\
/home/pi/Downloads/python-dolly-cam-app/2-run_application.sh &" /etc/rc.local > /home/pi/rc.local.replacement

# Give it executable access
sudo chmod +x /home/pi/rc.local.replacement

sudo mv /home/pi/rc.local.replacement /etc/rc.local

cd /home/pi/Documents/python-dolly-cam-app