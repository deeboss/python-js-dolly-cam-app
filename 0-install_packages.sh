# First time setup stuff. Assumes a clean RPi

# Package List: Python3 Dependencies, GPIO, GPhoto2

cd ../../
apt-get update  # To get the latest package lists
apt-get install build-essential tk-dev libncurses5-dev libncursesw5-dev libreadline6-dev libdb5.3-dev libgdbm-dev libsqlite3-dev libssl-dev libbz2-dev libexpat1-dev liblzma-dev zlib1g-dev libffi-dev python-rpi.gpio python3-rpi.gpio gphoto2 -y
wget https://www.python.org/ftp/python/3.7.1/Python-3.7.1.tgz
cd Python-3.7.1
./configure
make
sudo make install
sudo pip3 install --upgrade pip

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

# Install Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update && sudo apt install --no-install-recommends yarn