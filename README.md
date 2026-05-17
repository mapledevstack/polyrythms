# Polyrythms

>A calm, minimal generative visualization of layered sinusoidal tracks with tiny procedural audio clicks.

## Overview

Polyrythms draws a set of concentric, rhythmically moving curves and a small moving dot on each curve. You can change the shape of the curves using two sliders (cos and sin multipliers). When a dot crosses the horizontal center axis it produces a small cozy click; the pitch depends on how far the dot is from the center.

The project is a lightweight single-page demo written in plain HTML/CSS/JavaScript and requires no build step.


## How to run

1. Open `index.html` in a modern browser (Chrome, Edge, Firefox, Safari).
2. The app runs without any server; double-click `index.html` or open it from your browser's File > Open.

Note: Some browsers require a user gesture to resume audio. Use the `Enable sound` button to allow playback.

## Controls

- `Cos multiplier` slider — changes the cosine multiplier used when drawing the curves. Higher values increase the number of oscillations horizontally.
- `Sin multiplier` slider — changes the sine multiplier used when drawing the curves. Higher values increase vertical oscillations.
- `Enable sound` / `Disable sound` button — toggles the tiny clicks on/off. Click once to allow sound, click again to mute.

## Audio behavior

- Audio is generated with the Web Audio API (no external files). Each time a dot crosses the horizontal center axis the app plays a very short triangle-oscillator "click".
- Pitch: inner tracks (near the center) are mapped to higher pitches; outer tracks to lower pitches.
- Volume: the clicks are intentionally soft to preserve a calm, cozy feeling.
- If the browser doesn't support Web Audio or audio is blocked, the app silently falls back and no error is thrown.


## Customization notes

- Number of tracks: change `N` in `main.js`.
- Track spacing & radius: adjust `initialTrackRadius` and `trackStep` in `main.js`.
- Ball speed: change `initialOmega` and `omegaStep` in `main.js`.
- Audio volume: tweak the gain values in `ball.js` if you want louder or softer clicks.
