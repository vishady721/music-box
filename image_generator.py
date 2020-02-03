import json
from PIL import Image, ImageDraw
import sys
import os

chords = []

for line in open('log.json', 'r'):
    chords.append(json.loads(line))

#print(notes)

musicsheet = Image.new('RGB', [152, 1815], (255,255,255))

x = (133-20)/11
lines = ImageDraw.Draw(musicsheet)
lines.line((19,0,21,musicsheet.size[1]), fill = (211, 211, 211))
lines.line((131,0,133,musicsheet.size[1]), fill = (211, 211, 211))
lines.line((19 + x, 0, 21 + x, musicsheet.size[1]), fill = (211, 211, 211))
lines.line((19 + 2*x, 0, 21 + 2*x, musicsheet.size[1]), fill = (211, 211, 211))
lines.line((19 + 3*x, 0, 21 + 3*x, musicsheet.size[1]), fill = (211, 211, 211))
lines.line((19 + 4*x, 0, 21 + 4*x, musicsheet.size[1]), fill = (211, 211, 211))
lines.line((19 + 5*x, 0, 21 + 5*x, musicsheet.size[1]), fill = (211, 211, 211))
lines.line((19 + 6*x, 0, 21 + 6*x, musicsheet.size[1]), fill = (211, 211, 211))
lines.line((19 + 7*x, 0, 21 + 7*x, musicsheet.size[1]), fill = (211, 211, 211))
lines.line((19 + 8*x, 0, 21 + 8*x, musicsheet.size[1]), fill = (211, 211, 211))
lines.line((19 + 9*x, 0, 21 + 9*x, musicsheet.size[1]), fill = (211, 211, 211))
lines.line((19 + 10*x, 0, 21 + 10*x, musicsheet.size[1]), fill = (211, 211, 211))

for notes in chords:
	for chord in notes:
		for note in chord[:-2]:
			if chord[-1] <=60:
				if note == 'C':
					lines.rectangle((17, chord[-1]*30-.5-30, 22, chord[-1]*30+.5-30), fill = (255, 132, 203))
				elif note == 'C#':
					lines.rectangle((17+x, chord[-1]*30-.5-30, 22+x, chord[-1]*30+.5-30), fill = (255, 132, 203))
				elif note == 'D':
					lines.rectangle((17+2*x, chord[-1]*30-.5-30, 22+2*x, chord[-1]*30+.5-30), fill = (255, 132, 203))
				elif note == 'D#':
					lines.rectangle((17+3*x, chord[-1]*30-.5-30, 22+3*x, chord[-1]*30+.5-30), fill = (255, 132, 203))
				elif note == 'E':
					lines.rectangle((17+4*x, chord[-1]*30-.5-30, 22+4*x, chord[-1]*30+.5-30), fill = (255, 132, 203))
				elif note == 'F':
					lines.rectangle((17+5*x, chord[-1]*30-.5-30, 22+5*x, chord[-1]*30+.5-30), fill = (255, 132, 203))
				elif note == 'F#':
					lines.rectangle((17+6*x, chord[-1]*30-.5-30, 22+6*x, chord[-1]*30+.5-30), fill = (255, 132, 203))
				elif note == 'G':
					lines.rectangle((17+7*x, chord[-1]*30-.5-30, 22+7*x, chord[-1]*30+.5-30), fill = (255, 132, 203))
				elif note == 'G#':
					lines.rectangle((17+8*x, chord[-1]*30-.5-30, 22+8*x, chord[-1]*30+.5-30), fill = (255, 132, 203))
				elif note == 'A':
					lines.rectangle((17+9*x, chord[-1]*30-.5-30, 22+9*x, chord[-1]*30+.5-30), fill = (255, 132, 203))
				elif note == 'A#':
					lines.rectangle((17+10*x, chord[-1]*30-.5-30, 22+10*x, chord[-1]*30+.5-30), fill = (255, 132, 203))
				elif note == 'B':
					lines.rectangle((17+11*x, chord[-1]*30-.5-30, 22+11*x, chord[-1]*30+.5-30), fill = (255, 132, 203))

musicsheet.show('musicsheet.png')
os.remove('log.json')