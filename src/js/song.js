export default class Song {
    constructor(link) {
        this.link = link;
        this.audio = new Audio(link);
    }
    play() {
        this.audio.play();
    }
    pause() {
        this.audio.pause();
    }
}
