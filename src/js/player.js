import Song from './song';
import Video from './video';
import Subtitles from './subtitles';

export default class Player {
    constructor(links, pagePlayer) {

        // this.links = links;
        this.pagePlayer = pagePlayer;
        this.player = pagePlayer.querySelector('.player');
        this.playButton = this.player.querySelector('.player__play');
        this.stopButton = this.player.querySelector('.player__stop');
        this.video = new Video(links, this.pagePlayer);
        this.song = new Song(links.audio);
        this.subtitles = new Subtitles(links.subtitles);
        // console.log(`${this.video.videoElement.videoWidth}:${this.video.videoElement.videoHeight}`);
        this.video.videoElement.addEventListener('canplaythrough', () => {
            initCanvas.call(this, this.video.videoElement.videoWidth, this.video.videoElement.videoHeight);
        });
        this.playButton.addEventListener('click', () => {
            this.play();
        });
        this.stopButton.addEventListener('click', () => {
            this.pause();
        });

        function initCanvas(videoWidth, videoHeight) {
            let theCanvas = document.getElementById('canvasOne');
            let context = theCanvas.getContext('2d');
            theCanvas.width = videoWidth;
            theCanvas.height = videoHeight;

            this.play();

            function drawScreen() {
                // if (this.video.videoElement.paused || this.video.videoElement.ended) {
                //     return false;
                // }
                context.drawImage(this.video.videoElement, 0, 0);
                checkForSubtitles.call(this);
                addGrayScale();
            }

            function checkForSubtitles() {
                // let conditionLess;
                // if (this.subtitles.flag) {
                //     conditionLess = false;
                // } else {
                //     conditionLess = this.video.videoElement.currentTime <= this.subtitles.data[this.subtitles.index].endTime;
                // }
                // // let conditionLess = this.video.videoElement.currentTime <= this.subtitles.data[this.subtitles.index].endTime;
                // let conditionMore = this.video.videoElement.currentTime >= this.subtitles.data[this.subtitles.index].startTime;
                // if (conditionLess && conditionMore) {
                //     drawSubtitlesPicture();
                //     this.video.pause();
                // } else if (conditionLess === false && conditionMore) {
                //     this.video.play();
                //     this.subtitles.index++;
                // }
                //

                if (this.video.videoElement.currentTime >= this.subtitles.data[this.subtitles.index].endTime) {
                    this.subtitles.flag = false;
                    drawSubtitlesPicture();
                    this.video.pause();
                    this.subtitles.index++;
                    timerForSubtitles.call(this, 3000);
                    console.log(this.video.videoElement.currentTime);
                } else if (this.subtitles.flag) {
                    this.video.play();
                }

            }

            function timerForSubtitles(delay) {
                setInterval(() => {
                    this.subtitles.flag = true;
                }, delay);
            }

            function drawSubtitlesPicture() {
                context.fillStyle = '#ffffaa';
                context.fillRect(0, 0, theCanvas.width, theCanvas.height);
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
                idata.data.set(data);
                // Draw the pixels onto the visible canvas
                context.putImageData(idata, 0, 0);
                // Start over!// First, draw it into the backing canvas


                // Step 5: Apply scratches
                // if (RandomValue & lt; ScratchValue) {
                //     // Pick a random spot to show scratches
                //     float dist = 1.0 / ScratchValue;
                //     float d = distance(vUv, vec2(RandomValue * dist, RandomValue * dist));
                //     if (d & lt; 0.4) {
                //         // Generate the scratch
                //         float xPeriod = 8.0;
                //         float yPeriod = 1.0;
                //         float pi = 3.141592;
                //         float phase = TimeLapse;
                //         float turbulence = snoise(vUv * 2.5);
                //         float vScratch = 0.5 + (sin(((vUv.x * xPeriod + vUv.y * yPeriod + turbulence)) * pi + phase) * 0.5);
                //         vScratch = clamp((vScratch * 10000.0) + 0.35, 0.0, 1.0);
                //
                //         finalColour.xyz *= vScratch;
                //     }
                // }
            }

            function gameLoop() {
                window.setTimeout(gameLoop.bind(this), 62.5);
                drawScreen.call(this);
            }
            gameLoop.call(this);
        }
    }

    play() {
        this.video.play();
        this.song.play();
    }
    pause() {
        this.video.pause();
        this.song.pause();
    }
}
// player.js:45 26.307136
// player.js:45 26.368843
// player.js:45 26.431297
// player.js:45 26.495893
// player.js:45 26.559004
// player.js:45 26.623864
// player.js:45 26.687244
// player.js:45 26.750368
// player.js:45 26.814057
// player.js:45 26.876733
// player.js:45 26.941963
// player.js:45 27.005755
// player.js:45 27.069552
// player.js:45 27.132788
// player.js:45 27.196975
// player.js:45 27.26131
// player.js:45 27.324893
