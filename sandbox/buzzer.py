import RPi.GPIO as GPIO
import time

BuzzerPin = 16

CL = [0, 131, 147, 165, 175, 196, 211, 248] # Low C Note Frequency 
CM = [0, 262, 294, 330, 350, 393, 441, 495] # Middle C Note Frequency
CH = [0, 525, 589, 661, 700, 786, 882, 990] # High C Note Frequency 

song_1 = [
      # Sound Notes 1
    CL[2], CL[3], CL[4], CL[5], CL[6], CL[7], CM[1],
    CL[7], CL[6], CL[5], CL[4], CL[3], CL[2], CL[1], CM[1],
    CM[2], CM[3], CM[4], CM[5], CM[6], CM[7], CH[1],
    CM[7], CM[6], CM[5], CM[4], CM[3], CM[2], CM[1], CL[1],
    CL[2], CL[3], CL[4], CL[5], CL[6], CL[7], CM[1],
    CL[7], CL[6], CL[5], CL[4], CL[3], CL[2], CL[1], CM[1],
    CM[2], CM[3], CM[4], CM[5], CM[6], CM[7], CH[1],
    CM[7], CM[6], CM[5], CM[4], CM[3], CM[2], CM[1], CL[1],
    CL[2], CL[3], CL[4], CL[5], CL[6], CL[7], CM[1],
    CL[7], CL[6], CL[5], CL[4], CL[3], CL[2], CL[1], CM[1],
    CM[2], CM[3], CM[4], CM[5], CM[6], CM[7], CH[1],
    CM[7], CM[6], CM[5], CM[4], CM[3], CM[2], CM[1], CL[1],
    CL[2], CL[3], CL[4], CL[5], CL[6], CL[7], CM[1],
    CL[7], CL[6], CL[5], CL[4], CL[3], CL[2], CL[1], CM[1],
    CM[2], CM[3], CM[4], CM[5], CM[6], CM[7], CH[1],
    CM[7], CM[6], CM[5], CM[4], CM[3], CM[2], CM[1], CL[1],
    CL[2], CL[3], CL[4], CL[5], CL[6], CL[7], CM[1],
    CL[7], CL[6], CL[5], CL[4], CL[3], CL[2], CL[1], CM[1],
    CM[2], CM[3], CM[4], CM[5], CM[6], CM[7], CH[1],
    CM[7], CM[6], CM[5], CM[4], CM[3], CM[2], CM[1], CL[1],
    CL[0]
    ]

# Beats of song 1, 1 means 1/8 beats
beat_1 = [
    8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8,
    7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7,
    6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5, 5,
    4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4
]

def setup():
    GPIO.setmode(GPIO.BOARD) # Numbers GPIOs by physical location
    GPIO.setup(BuzzerPin, GPIO.OUT) # Set pins' mode is output
    global Buzz # Assign a global variable to replace GPIO.PWM
    Buzz = GPIO.PWM(BuzzerPin, 440) # 440 is initial frequency.
    Buzz.start(50) # Start BuzzerPin pin with 50% duty ration

def loop():
    while True:
        print ('\n Playing song 1...')
        for i in range(1, len(song_1)): # Play song 1
            Buzz.ChangeFrequency(song_1[i]) # Change the frequency along the song note
            time.sleep(beat_1[i] * 0.02) # delay a note for beat * 0.5s
            time.sleep(0.01) # Wait a second for next song.

def destory():
    Buzz.stop() # Stop the BuzzerPin
    GPIO.output(BuzzerPin, 1) # Set BuzzerPin pin to High
    GPIO.cleanup() # Release resource

if __name__ == '__main__': # Program start from here
    setup()
    try:
        loop()
    except KeyboardInterrupt: # When 'Ctrl+C' is pressed, the child program destroy() will be executed.
        destory()