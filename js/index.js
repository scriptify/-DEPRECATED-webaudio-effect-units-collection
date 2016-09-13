import EffectUnit from 'webaudio-effect-unit';
import Tuna from 'tunajs';

export function createGain(audioCtx, FACTOR = 0.01) {

  return new EffectUnit(
    {
      gain: audioCtx.createGain()
    },
    {
      more: effChain => {
        if((effChain.gain.gain.value + FACTOR) <= 1)
          effChain.gain.gain.value += FACTOR;
      },

      less: effChain => {
        if((effChain.gain.gain.value - FACTOR) >= 0)
          effChain.gain.gain.value -= FACTOR;
      },

      set: (effChain, val) => {
        effChain.gain.gain.value = val;
      }

    },
    audioCtx);
}

export function createChorus(audioCtx, tuna = new Tuna(audioCtx)) {

  // Tuna is optional

  return new EffectUnit(
    {
      chorus: new tuna.Chorus({
        rate: 1.5, // 0.01 - 8
        feedback: 0.2, // 0 - 1
        delay: 0.0045 // 0 - 1
      })
    },
    {
      setRate: (effChain, val) => {
        effChain.chorus.rate = val;
      },
      setFeedback: (effChain, val) => {
        effChain.chorus.feedback = val;
      },
      setDelay: (effChain, val) => {
        effChain.chorus.delay = val;
      }
    },
    audioCtx);

}

export function createDelay(audioCtx, tuna = new Tuna(audioCtx)) {

  return new EffectUnit(
    {
      delay: new tuna.Delay({
          feedback: 0.45,    //0 to 1+
          delayTime: 150,    //1 to 10000 milliseconds
          wetLevel: 0.25,    //0 to 1+
          dryLevel: 1,       //0 to 1+
          cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
      })
    },
    {
      setFeedback: (effChain, val) => {
        effChain.delay.feedback = val;
      },
      setDelayTime: (effChain, val) => {
        effChain.delay.delayTime = val;
      },
      setWetLevel: (effChain, val) => {
        effChain.delay.wetLevel = val;
      },
      setDryLevel: (effChain, val) => {
        effChain.delay.dryLevel = val;
      },
      setCutoff: (effChain, val) => {
        effChain.delay.cutoff = val;
      }
    },
    audioCtx);

}

export function createPhaser(audioCtx, tuna = new Tuna(audioCtx)) {
  return new EffectUnit(
    {
      phaser: new tuna.Phaser({
          rate: 1.2,                     //0.01 to 8 is a decent range, but higher values are possible
          depth: 0.3,                    //0 to 1
          feedback: 0.2,                 //0 to 1+
          stereoPhase: 30,               //0 to 180
          baseModulationFrequency: 700  //500 to 1500
      })
    },
    {
      setRate: (effChain, val) => {
        effChain.phaser.rate = val;
      },
      setDepth: (effChain, val) => {
        effChain.phaser.depth = val;
      },
      setFeedback: (effChain, val) => {
        effChain.phaser.feedback = val;
      },
      setStereoPhase: (effChain, val) => {
        effChain.phaser.stereoPhase = val;
      },
      setBaseModulationFrequency: (effChain, val) => {
        effChain.phaser.baseModulationFrequency = val;
      }
    },
    audioCtx);
}

export function createOverdrive(audioCtx, tuna = new Tuna(audioCtx)) {
  return new EffectUnit(
    {
      overdrive: new tuna.Overdrive({
          outputGain: 0.5,         //0 to 1+
          drive: 0.7,              //0 to 1
          curveAmount: 1,          //0 to 1
          algorithmIndex: 0       //0 to 5, selects one of our drive algorithms
      })
    },
    {
      setOuputGain: (effChain, val) => {
        effChain.overdrive.outputGain = val;
      },
      setDrive: (effChain, val) => {
        effChain.overdrive.drive = val;
      },
      setCurveAmount: (effChain, val) => {
        effChain.overdrive.curveAmount = val;
      },
      setDriveAlgorithm: (effChain, val) => {
        effChain.overdrive.algorithmIndex = val;
      }
    },
    audioCtx);
}

export function createCompressor(audioCtx, tuna = new Tuna(audioCtx)) {
  return new EffectUnit(
    {
      compressor: new tuna.Compressor({
          threshold: -1,    //-100 to 0
          makeupGain: 1,     //0 and up
          attack: 1,         //0 to 1000
          release: 0,        //0 to 3000
          ratio: 4,          //1 to 20
          knee: 5,           //0 to 40
          automakeup: true  //true/false
      })
    },
    {
      setThreshold: (effChain, val) => {
        effChain.compressor.threshold = val;
      },
      setMakeupGain: (effChain, val) => {
        effChain.compressor.makeupGain = val;
      },
      setAttak: (effChain, val) => {
        effChain.compressor.attak = val;
      },
      setRelease: (effChain, val) => {
        effChain.compressor.release = val;
      },
      setRatio: (effChain, val) => {
        effChain.compressor.ratio = val;
      },
      setKnee: (effChain, val) => {
        effChain.compressor.knee = val;
      },
      setAutomakeup: (effChain, val) => {
        effChain.compressor.automakeup = val;
      },
    },
    audioCtx);
}

export function createLowpass(audioCtx) {
  return new EffectUnit(
    {
      lowpass: () => {
        const lp = audioCtx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 800;
        return lp;
      }
    },
    {
      setFrequency: (effChain, val) => {
        effChain.lowpass.frequency.value = val;
      }
    },
    audioCtx);
}

export function createHighpass(audioCtx, tuna = new Tuna(audioCtx)) {
  return new EffectUnit(
    {
      highpass: () => {
        const hp = audioCtx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 200;
        return hp;
      }
    },
    {
      setFrequency: (effChain, val) => {
        effChain.highpass.frequency.value = val;
      }
    },
    audioCtx);
}

export function createTremolo(audioCtx, tuna = new Tuna(audioCtx)) {
  return new EffectUnit(
    {
      tremolo: new tuna.Tremolo({
          intensity: 0.3,    //0 to 1
          rate: 4,         //0.001 to 8
          stereoPhase: 0    //0 to 180
      })
    },
    {
      setIntensity: (effChain, val) => {
        effChain.tremolo.intensity = val;
      },
      setRate: (effChain, val) => {
        effChain.tremolo.rate = val;
      },
      setStereoPhase: (effChain, val) => {
        effChain.tremolo.stereoPhase = val;
      }
    },
    audioCtx);
}

export function createWahWah(audioCtx, tuna = new Tuna(audioCtx)) {
  return new EffectUnit(
    {
      wahwah: new tuna.WahWah({
          automode: true,                //true/false
          baseFrequency: 0.5,            //0 to 1
          excursionOctaves: 2,           //1 to 6
          sweep: 0.2,                    //0 to 1
          resonance: 10,                 //1 to 100
          sensitivity: 0.5              //-1 to 1
      })
    },
    {
      setAutomode: (effChain, val) => {
        effChain.wahwah.automode = val;
      },
      setBaseFrequency: (effChain, val) => {
        effChain.wahwah.baseFrequency = val;
      },
      setExcursionOctaves: (effChain, val) => {
        effChain.wahwah.excursionOctaves = val;
      },
      setSweep: (effChain, val) => {
        effChain.wahwah.sweep = val;
      },
      setResonance: (effChain, val) => {
        effChain.wahwah.resonance = val;
      },
      setSensitivity: (effChain, val) => {
        effChain.wahwah.sensitivity = val;
      }
    },
    audioCtx);
}

export function createBitcrusher(audioCtx, tuna = new Tuna(audioCtx)) {
  return new EffectUnit(
    {
      bitcrusher: new tuna.Bitcrusher({
          bits: 4,          //1 to 16
          normfreq: 0.1,    //0 to 1
          bufferSize: 4096  //256 to 16384
      })
    },
    {
      setBits: (effChain, val) => {
        effChain.bitcrusher.bits = val;
      },
      setNormalFrequency: (effChain, val) => {
        effChain.bitcrusher.normfreq = val;
      },
      setBufferSize: (effChain, val) => {
        effChain.bitcrusher.bufferSize = val;
      }
    },
    audioCtx);
}

export function createMoog(audioCtx, tuna = new Tuna(audioCtx)) {
  return new EffectUnit(
    {
      moog: new tuna.MoogFilter({
          cutoff: 0.065,    //0 to 1
          resonance: 3.5,   //0 to 4
          bufferSize: 4096  //256 to 16384
      })
    },
    {
      setCutoff: (effChain, val) => {
        effChain.moog.cutOff = val;
      },
      setResonance: (effChain, val) => {
        effChain.moog.resonance = val;
      },
      setBufferSize: (effChain, val) => {
        effChain.moog.bufferSize = val;
      }
    },
    audioCtx);
}

export function createPingPongDelay(audioCtx, tuna = new Tuna(audioCtx)) {
  return new EffectUnit(
    {
      pingpong: new tuna.PingPongDelay({
          wetLevel: 0.5, //0 to 1
          feedback: 0.3, //0 to 1
          delayTimeLeft: 150, //1 to 10000 (milliseconds)
          delayTimeRight: 200 //1 to 10000 (milliseconds)
      })
    },
    {
      setWetLevel: (effChain, val) => {
        effChain.pingpong.wetLevel = val;
      },
      setFeedback: (effChain, val) => {
        effChain.pingpong.feedback = val;
      },
      setDelayTimeLeft: (effChain, val) => {
        effChain.pingpong.delayTimeLeft = val;
      },
      setDelayTimeRight: (effChain, val) => {
        effChain.pingpong.delayTimeRight = val;
      }
    },
    audioCtx);
}

export default function createEffectCollection(audioCtx) {

  const tuna = new Tuna(audioCtx);

  return {
    gain: createGain(audioCtx),
    chorus: createChorus(audioCtx, tuna),
    delay: createDelay(audioCtx, tuna),
    paser: createPhaser(audioCtx, tuna),
    overdrive: createOverdrive(audioCtx, tuna),
    compressor: createCompressor(audioCtx, tuna),
    lowpass: createLowpass(audioCtx, tuna),
    highpass: createHighpass(audioCtx, tuna),
    tremolo: createTremolo(audioCtx, tuna),
    wahwah: createWahWah(audioCtx, tuna),
    bitcrusher: createBitcrusher(audioCtx, tuna),
    moog: createMoog(audioCtx, tuna),
    pingPongDelay: createPingPongDelay(audioCtx, tuna)
  };
}
