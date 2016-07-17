import Audio from './audio';
import Video from './video';
import Subtitles from './subtitles';

export default class Player {
    constructor(links, pagePlayer) {

        // this.links = links;
        this.pagePlayer = pagePlayer;
        this.player = pagePlayer.querySelector('.player');
        this.playButton = this.player.querySelector('.player__play');
        this.stopButton = this.player.querySelector('.player__stop');

        this.audio = new Audio(links.audio);
        this.video = new Video(links.video);
        this.subtitles = new Subtitles(links.subtitles);

        this.videoElement = document.createElement('video');
        // this.videoElement.setAttribute('crossorigin', 'anonymous');

        this.playButton.addEventListener('click', (e) => {
            this.play();
        });
        this.stopButton.addEventListener('click', (e) => {
            this.stop();
        });
        init.call(this);

        function init() {
            let videoDiv = document.createElement('div');
            // let this.videoElement = document.createElement('video');
            let videoWidth;
            let videoHeight;
            this.pagePlayer.appendChild(videoDiv);
            videoDiv.appendChild(this.videoElement);
            videoDiv.setAttribute('style', 'display:none;');

            this.videoElement.addEventListener('canplaythrough', () => {
                videoWidth = this.videoElement.videoWidth;
                videoHeight = this.videoElement.videoHeight;
                canvasApp.call(this);
            }, false);
            this.videoElement.setAttribute('src', this.video.link);


            function canvasApp() {
                let theCanvas = document.getElementById('canvasOne');
                let context = theCanvas.getContext('2d');
                theCanvas.width = videoWidth;
                theCanvas.height = videoHeight;
                this.videoElement.play();

                function drawScreen() {
                    if (this.videoElement.paused || this.videoElement.ended) return false;
                    //  Background
                    context.fillStyle = '#ffffaa';
                    context.fillRect(0, 0, theCanvas.width, theCanvas.height);
                    //  Box
                    // context.strokeStyle = '#000000';
                    // context.strokeRect(5, 5, theCanvas.width - 10, theCanvas.height - 10);
                    //  videoWidt
                    context.drawImage(this.videoElement, 0, 0);
                    addGrayScale();
                }

                function addGrayScale() {
                    // First, draw it into the backing canvas
                    // Grab the pixel data from the backing canvas
                    let idata = context.getImageData(0, 0, theCanvas.width, theCanvas.height);
                    let data = idata.data;
                    // Loop through the pixels, turning them grayscale
                    for (let i = 0; i < data.length; i += 4) {
                        let r = data[i];
                        let g = data[i + 1];
                        let b = data[i + 2];
                        let brightness = (3 * r + 4 * g + b) >>> 3;
                        data[i] = brightness;
                        data[i + 1] = brightness;
                        data[i + 2] = brightness;
                    }
                    console.log(12)
                    idata.data = data;
                    // Draw the pixels onto the visible canvas
                    context.putImageData(idata, 0, 0);
                    // Start over!// First, draw it into the backing canvas
                }

                function gameLoop() {
                    window.setTimeout(gameLoop.bind(this), 20);
                    drawScreen.call(this);
                }

                gameLoop.call(this);
            }
        }
    }

    play() {
        this.videoElement.play();
    }
    stop() {
        this.videoElement.pause();
    }
}
