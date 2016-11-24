# Webaudio effect units collection

Effects for everyone!

All effects of this collection are based on the [webaudio-effect-unit](https://github.com/scriptify/webaudio-effect-unit) module.
If you want to gain a deeper knowledge on how you can use those effects, have a look at this repository.
Here a list of all the effects included in this package:

* Gain
* Chorus
* Delay
* Phaser
* Overdrive
* Compressor
* Lowpass
* Highpass
* Tremolo
* Wahwah
* Bitcrusher
* Moog
* PingPongDelay

## Installation
Through npm:
`npm i webaudio-effect-units-collection -S`

## Module usage
#### Default export
Per default, the module exports the following function:
```
createEffectCollection(audioCtx)
```
_Example_
```javascript
import createEffectCollection from 'webaudio-effect-units-collection';
const audioCtx = new AudioContext();
const { gain, chorus, delay, phaser } = createEffectCollection(audioCtx)
```

This function requires an AudioContext object as its 1° argument.
It returns an object with all effects contained by this package. The property names of this object are equivalent to the effect names.

#### Named exports
For each effect, you can import a function which creates an instance of the effect you want.
There's always one (the 1°) required argument:
_An AudioContext object._

The function names follow this pattern:
__create{EffectName}__

_Example_

```javascript
import { createGain, createChorus, createPhaser } from 'webaudio-effect-units-collection';
const audioCtx = new AudioContext();
const gain = createGain(audioCtx);
const chorus = createChorus(audioCtx);
const phaser = createPhaser(audioCtx);
```
