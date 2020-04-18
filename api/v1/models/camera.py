"""
Camera Class from Models Module
"""
import os
import sys
import logging
import gphoto2 as gp

class Camera:
    """
        Camera class handles all camera related actions
    """

    def __init__(self):
        """
            instantiates stepper object
        """
        print("Camera is ready")

    def checkIfDeviceExists(self):
        print("Checking USB ports for device")
        logging.basicConfig(
            format='%(levelname)s: %(name)s: %(message)s', level=logging.WARNING)
        callback_obj = gp.check_result(gp.use_python_logging())
        cameras = gp.Camera.autodetect()

        for n, (name, value) in enumerate(cameras):
            print('camera number', n)
            print('=================')
            print(name)
            print(value)
            
        return name, value

    def captureImage(self):
        print("Capturing Image...")
        os.system("gphoto2 --capture-image")


    def changeSettings(self, name, value):
        print("Changing Camera's  {} settings to {}...".format(name, value))
        os.system('gphoto2 --set-config={}={}'.format(name, value))