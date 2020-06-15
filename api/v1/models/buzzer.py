import RPi.GPIO as GPIO
import time

buzzer_pin = 26

class Buzzer:
    def __init__(self):
        self.notes = {
            'B0' : 31,
            'C1' : 33, 'CS1' : 35,
            'D1' : 37, 'DS1' : 39,
            'EB1' : 39,
            'E1' : 41,
            'F1' : 44, 'FS1' : 46,
            'G1' : 49, 'GS1' : 52,
            'A1' : 55, 'AS1' : 58,
            'BB1' : 58,
            'B1' : 62,
            'C2' : 65, 'CS2' : 69,
            'D2' : 73, 'DS2' : 78,
            'EB2' : 78,
            'E2' : 82,
            'F2' : 87, 'FS2' : 93,
            'G2' : 98, 'GS2' : 104,
            'A2' : 110, 'AS2' : 117,
            'BB2' : 123,
            'B2' : 123,
            'C3' : 131, 'CS3' : 139,
            'D3' : 147, 'DS3' : 156,
            'EB3' : 156,
            'E3' : 165,
            'F3' : 175, 'FS3' : 185,
            'G3' : 196, 'GS3' : 208,
            'A3' : 220, 'AS3' : 233,
            'BB3' : 233,
            'B3' : 247,
            'C4' : 262, 'CS4' : 277,
            'D4' : 294, 'DS4' : 311,
            'EB4' : 311,
            'E4' : 330,
            'F4' : 349, 'FS4' : 370,
            'G4' : 392, 'GS4' : 415,
            'A4' : 440, 'AS4' : 466,
            'BB4' : 466,
            'B4' : 494,
            'C5' : 523, 'CS5' : 554,
            'D5' : 587, 'DS5' : 622,
            'EB5' : 622,
            'E5' : 659,
            'F5' : 698, 'FS5' : 740,
            'G5' : 784, 'GS5' : 831,
            'A5' : 880, 'AS5' : 932,
            'BB5' : 932,
            'B5' : 988,
            'C6' : 1047, 'CS6' : 1109,
            'D6' : 1175, 'DS6' : 1245,
            'EB6' : 1245,
            'E6' : 1319,
            'F6' : 1397, 'FS6' : 1480,
            'G6' : 1568, 'GS6' : 1661,
            'A6' : 1760, 'AS6' : 1865,
            'BB6' : 1865,
            'B6' : 1976,
            'C7' : 2093, 'CS7' : 2217,
            'D7' : 2349, 'DS7' : 2489,
            'EB7' : 2489,
            'E7' : 2637,
            'F7' : 2794, 'FS7' : 2960,
            'G7' : 3136, 'GS7' : 3322,
            'A7' : 3520, 'AS7' : 3729,
            'BB7' : 3729,
            'B7' : 3951,
            'C8' : 4186, 'CS8' : 4435,
            'D8' : 4699, 'DS8' : 4978
        }

        self.success_melody = [
            self.notes['A4'],self.notes['AS4'],self.notes['B4'],self.notes['C5']
        ]

        self.success_tempo = [
            5, 5, 5, 1
        ]

    def buzz(self, frequency, length):	 #create the function "buzz" and feed it the pitch and duration)
        if(self.frequency==0):
            time.sleep(self.length)
            return
        self.period = 1.0 / self.frequency 		 #in physics, the period (sec/cyc) is the inverse of the frequency (cyc/sec)
        self.delayValue = period / 2		 #calcuate the time for half of the wave
        self.numCycles = int(self.length * self.frequency)	 #the number of waves to produce is the duration times the frequency
        
        for i in range(numCycles):		#start a loop from 0 to the variable "cycles" calculated above
            GPIO.output(buzzer_pin, True)	 #set pin 27 to high
            time.sleep(self.delayValue)		#wait with pin 27 high
            GPIO.output(buzzer_pin, False)		#set pin 27 to low
            time.sleep(self.delayValue)		#wait with pin 27 low

    
    def setup(self):
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(buzzer_pin, GPIO.IN)
        GPIO.setup(buzzer_pin, GPIO.OUT)
        
    def destroy(self):
        GPIO.cleanup()				# Release resource


    def play(self, melody,tempo,pause,pace=0.800):
        
        for i in range(0, len(melody)):		# Play song
            self.noteDuration = pace/tempo[i]
            self.buzz(melody[i],noteDuration)	# Change the frequency along the song note
            
            self.pauseBetweenNotes = noteDuration * pause
            time.sleep(pauseBetweenNotes)

    def playSuccess(self):
        try:
            self.setup()
            self.play(self.success_melody, self.success_tempo, 0.08, 0.800)		
            self.destroy()
        except KeyboardInterrupt:  	# When 'Ctrl+C' is pressed, the child program destroy() will be  executed.
            self.destroy()