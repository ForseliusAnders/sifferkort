# -*- coding: utf-8 -*-
"""Kon over bilder som vantar pa att Gemini-kvoten ska aterstallas.
Kor: python3 att_generera.py   (hoppar over nummer vars bild redan ar ny)
"""
import time
import urllib.error

from generera_kort import generera

KO = {
    52: ('A wall calendar hanging open: a large spiral-bound calendar page '
         'showing a full grid of numbered day squares, with a stack of '
         'previous months curling behind it and a few days marked with red '
         'circles. Clean and bold, instantly readable as a yearly wall '
         'calendar.'),
    72: ('A golfer in mid-swing on a green: crisp polo shirt, cap and glove, '
         'club raised at the top of a powerful drive, a white golf ball on a '
         'red tee in front of him with a small divot of grass flying. Bright '
         'and dynamic, instantly readable as golf.'),
}

if __name__ == '__main__':
    kvar = dict(KO)
    while kvar:
        for n, prompt in list(kvar.items()):
            try:
                print(generera(n, prompt), flush=True)
                del kvar[n]
                time.sleep(15)
            except urllib.error.HTTPError as e:
                if e.code == 429:
                    print('429 — vantar 15 min...', flush=True)
                    time.sleep(900)
                    break
                raise
            except SystemExit as e:
                print(f'BLOCKERAD {n}: {str(e)[:120]}', flush=True)
                del kvar[n]
    print('alla klara', flush=True)
