# Python Dolly Cam App

For the raspberry PI

```
# Edit the Wifi Name
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf

# Activate the hotspot
sudo /usr/bin/autohotspotN
```

To get started:

1. Run virtual env with `. venv/bin/activate` command
2. Install packages through `pip install`
3. Run app through:
```
export FLASK_APP=hello.py
flask run --host=0.0.0.0
```
