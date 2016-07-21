export default class Song {
    constructor(link) {
        this.link = link;
        this.audio = new Audio(link);
        this.audio.crossOrigin = "anonymous";
        this.context = new(window.AudioContext || window.webkitAudioContext);
        this.source = this.context.createMediaElementSource(this.audio);
        // gainNode = context.createGain();
        //filterNode = context.createBiquadFilter();
this.addDirtyEffects();

    }
    addDirtyEffects() {
      const distortion = this.context.createWaveShaper();
      const biquadFilter = this.context.createBiquadFilter();
      biquadFilter.type = 'lowpass';
      biquadFilter.frequency.value = 1000;
      biquadFilter.gain.value = 20;
      this.source.connect(distortion);
      distortion.connect(biquadFilter);
      // this.generateWHiteNoize();
      biquadFilter.connect(this.context.destination);
    }
    generateWHiteNoize() {
        var bufferSize = 4096;
        var pinkNoise = (function() {
            var b0, b1, b2, b3, b4, b5, b6;
            b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
            var node = this.context.createScriptProcessor(bufferSize, 1, 1);
            node.onaudioprocess = function(e) {
                var output = e.outputBuffer.getChannelData(0);
                for (var i = 0; i < bufferSize; i++) {
                    var white = Math.random() * 2 - 1;
                    b0 = 0.99886 * b0 + white * 0.0555179;
                    b1 = 0.99332 * b1 + white * 0.0750759;
                    b2 = 0.96900 * b2 + white * 0.1538520;
                    b3 = 0.86650 * b3 + white * 0.3104856;
                    b4 = 0.55000 * b4 + white * 0.5329522;
                    b5 = -0.7616 * b5 - white * 0.0168980;
                    output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                    output[i] *= 22.9; // (roughly) compensate for gain
                    b6 = white * 0.115926;
                }
            }
            return node;
        }.bind(this))();

        pinkNoise.connect(this.context.destination);
    }
    play() {
        this.audio.play();
    }
    pause() {
        this.audio.pause();
    }
}
