export default class Video {
    constructor(links, pagePlayer) {
        // this.link = link;
        this.videoElement = document.createElement('video');
        this.videoElement.setAttribute('crossorigin', 'anonymous');
        this.videoDiv = document.createElement('div');
        pagePlayer.appendChild(this.videoDiv);
        this.videoDiv.appendChild(this.videoElement);
        this.videoDiv.setAttribute('style', 'display:none;');
        this.videoElement.setAttribute('src', links.video);
        this.videoElement.muted = true;
    }
    play() {
        this.videoElement.play();
    }
    pause() {
        this.videoElement.pause();
    }
}
