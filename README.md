# Dolly Cam App + Car for Python and Raspberry Pi

_< Currently in Progress >_

## Pre-requisites

1. A Raspberry Pi (Currently using Model 3)
2. Raspbian OS - Buster
3. Python v3

## Setup

For the Raspberry Pi

```
# Edit the Wifi Name
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf

# Activate the hotspot
sudo /usr/bin/autohotspotN
```

For the Python environment
(Make sure you're in the application's directory)

```
python3 -m venv venv
```

## 

1. Go into the application directory through `cd /Documents/app`
2. Run virtual env with `. venv/bin/activate` command
3. Install packages through `pip install`   (`requirements.txt` coming soon)
4. Run app through:
```
export FLASK_APP=app.py
flask run --host=0.0.0.0
```
5. Access your Raspberry Pi client web server through your Pi's IP address at port 5000, or `10.10.10.10:5000` when disconnected from the internet

## Roadmap

1. The Raspberry Pi can act as its own WiFi hotspot without active internet connection (✅ _03/04/2020_)
2. Anyone can issue commands to the Raspberry Pi OS through the Python/Flask Web Server at port 5000 (✅ _04/04/2020_)
3. _*Coming Soon*_
4. _*Coming Soon*_
5. _*Coming Soon*_
6. _*Coming Soon*_
7. _*Coming Soon*_
8. _*Coming Soon*_
10. _*Coming Soon*_



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
