export default class Video {
    constructor(link, pagePlayer) {
        // this.link = link;
        this.videoElement = document.createElement('video');
        this.videoElement.setAttribute('crossorigin', 'anonymous');
        this.videoDiv = document.createElement('div');
        pagePlayer.appendChild(this.videoDiv);
        this.videoDiv.appendChild(this.videoElement);
        this.videoDiv.setAttribute('style', 'display:none;');
        this.videoElement.setAttribute('src', link);
        // this.videoElement.setAttribute('width', this.videoElement.videoWidth/2);
        // this.videoElement.setAttribute('height', this.videoElement.videoHeight/2);
        this.videoElement.muted = true;
    }
    play() {
        this.videoElement.play();
    }
    pause() {
        this.videoElement.pause();
    }
}
