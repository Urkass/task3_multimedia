export default class Song {
    constructor(link) {
        this.link = link;
        this.audio = new Audio(link);
        this.audio.crossOrigin = 'anonymous';
        this.context = new (window.AudioContext || window.webkitAudioContext);
        this.source = this.context.createMediaElementSource(this.audio);
        this.gainNode = this.context.createGain();
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
        this.generateWHiteNoize();
        this.source.connect(this.gainNode);
        biquadFilter.connect(this.context.destination);
    }
    generateWHiteNoize() {
        const node = this.context.createScriptProcessor(1024, 1, 1);
        node.onaudioprocess = (e) => {
            let output = e.outputBuffer.getChannelData(0);
            for (let i = 0; i < output.length; i++) {
                output[i] = Math.random();
            }
        };
        node.connect(this.gainNode);
    }
    play() {
        this.audio.play();
        this.gainNode.connect(this.context.destination);
    }
    pause() {
        this.audio.pause();
        this.gainNode.disconnect();
    }
}
