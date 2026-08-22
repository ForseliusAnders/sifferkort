# -*- coding: utf-8 -*-
"""Kon over bilder som vantar pa att Gemini-kvoten ska aterstallas.
Kor: python3 att_generera.py   (hoppar over nummer vars bild redan ar ny)
"""
import time
import urllib.error

from generera_kort import generera

KO = {
    38: ('A tense border checkpoint between two countries: a long fence of '
         'coiled barbed wire stretching across a bare strip of no-mans-land, '
         'a striped red-and-white barrier pole lowered across the road, and '
         'a small watchtower with a searchlight beside it. Two flagpoles '
         'stand on either side of the line facing each other. Cold overcast '
         'atmosphere, no soldiers or weapons visible — the divided border '
         'line itself is the subject.'),
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
