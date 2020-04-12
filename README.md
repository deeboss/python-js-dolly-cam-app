# Dolly Cam App + Car for Python and Raspberry Pi

_< Currently in Progress >_

## Pre-requisites

1. A Raspberry Pi (Currently using Model 3)
2. Raspbian OS - Buster
3. Python v3

## Setup

Go through steps "First-time setup and initialization" and then steps "Automatic initialization" if no prior initializations have been made. Following the first initialization, only the latter steps need to be run for initialization.

**Virtual environment packages setup**
1. Go into the application directory through `cd /Documents/python-dolly-cam-app/`
2. Setup virtual env with `python3 -m venv venv` command
3. Install packages through `pip install -r requirements.rpi.txt`

**Automatic initialization (only after installing required packages in venv):**
1. Run initialization executable 'sudo /home/pi/Documents/python-dolly-cam-app/intialize.py'
    1a. If above step fails, change initialize.py to executable with `sudo chmod u+x ~/Documents/python-dolly-cam-app/initialize.py`
2. Use your browser (mobile or desktop) to access your Raspberry Pi client web server through your Pi's IP address at port 5000 (or `10.10.10.10:5000` when disconnected from the internet)
3. To close server after use, press ^C (ctrl + C)
4. Deactivate hotspot with 'sudo /home/pi/Documents/python-dolly-cam-app/hotspot.sh'

##

Alternatively, the following related commands are presented below as well.

```
# Activate hotspot and run app.py from virtual environment
sudo ~/Documents/python-dolly-cam-app/initialize.py

# If above step fails, initialize.py might not be an executable. Try following command:
sudo chmod u+x ~/Documents/python-dolly-cam-app/initialize.py

# Activate/Deactivate the hotspot
sudo ~/Documents/python-dolly-cam-app/hotspot.sh

# Create a virtual environment (Make sure you're in the application's directory)
python3 -m venv venv
```

## Roadmap

#### General
1. ✅ The Raspberry Pi can act as its own WiFi hotspot without active internet connection (_03/04/2020_)
2. ✅ Anyone can issue commands to the Raspberry Pi OS through the Python/Flask Web Server at port 5000 (_04/04/2020_)
3. Implementing a physical button that initializes server environment, i.e. turns on hotspot and runs server through venv
4. Using the web server to control a servo - forward, backward, speed (RPM).
5. Gearbox design and coordination thereof with servo control script. Ideally want to be able to input a given speed in m/s rather than RPM.
6. **First major milestone: vehicle with forward/backward movement.**
7. Incorporating turning input.

#### Camera
1. ✅ Can connect a camera and control it via the Raspberry Pi + your phone (_11/04/2020_)
2. ✅ Support for different brands of cameras by outputting a list of configurations available for that specific device  (_12/04/2020_)
3. Can toggle to video mode and photography mode

#### Client Side Remote Control
1. Can see a live preview rendering on your phone
2. _To be determined_
3. _To be determined_

## Connecting the Camera

_Before attempting to use your camera, check if it is listed as a supported device [here](http://www.gphoto.org/proj/libgphoto2/support.php)_ 

1. Connect your DSLR camera to one of the USB ports
2. Turn the camera on
3. Enable "PTP mode" or "Connect to Computer mode" equivalent
4. For optimal results, set it to "Manual" mode
5. Run `. get_camera_configs.sh`. This will automatically create a list of supported configurations for your device
6. Access the remote control server (`10.10.10.10:5000`) and enjoy!

## Resources

**Set up your Raspberry Pi as an Access Point Wi-Fi Hotspot**
https://www.youtube.com/watch?v=qMT-0mz1lkI

**Installing Python**
```
sudo apt-get install -y build-essential tk-dev libncurses5-dev libncursesw5-dev libreadline6-dev libdb5.3-dev libgdbm-dev libsqlite3-dev libssl-dev libbz2-dev libexpat1-dev liblzma-dev zlib1g-dev libffi-dev

wget https://www.python.org/ftp/python/3.7.1/Python-3.7.1.tgz

sudo tar zxf Python-3.7.1.tgz
cd Python-3.7.1
./configure
make
sudo make install
sudo pip3 install --upgrade pip
```

https://installvirtual.com/install-python-3-on-raspberry-pi-raspbian/

http://www.knight-of-pi.org/installing-python3-6-on-a-raspberry-pi/


**Raspberry Pi Remote Controlled Car**
https://www.instructables.com/id/Raspberry-Pi-Remote-Controlled-Car-1/
