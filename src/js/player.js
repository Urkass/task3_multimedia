import Song from './song';
import Video from './video';
import Subtitles from './subtitles';

export default class Player {
    constructor(links, pages) {

        this.pagePlayer = pages.pagePlayer;
        this.pagePreloader = pages.pagePreloader;
        this.player = this.pagePlayer.querySelector('.player');
        this.playButton = this.player.querySelector('.player__button_function_play');
        this.pauseButton = this.player.querySelector('.player__button_function_pause');
        this.video = new Video(links.video, this.pagePlayer);
        this.song = new Song(links.audio);
        this.subtitles = new Subtitles(links.subtitles);
        this.previousTime = 0;
        this.pauseFlag = true;

        this.video.videoElement.addEventListener('canplaythrough', () => {
            this.pagePlayer.classList.remove('page_hidden');
            this.pagePreloader.classList.add('page_hidden');
            init.call(this, this.video.videoElement.videoWidth, this.video.videoElement.videoHeight);
        });
        this.playButton.addEventListener('click', () => {
            this.play();
        });
        this.pauseButton.addEventListener('click', () => {
            this.pause();
        });

        function init(videoWidth, videoHeight) {
            let theCanvas = document.getElementById('canvas');
            let context = theCanvas.getContext('2d');
            let webglCanvas = document.getElementById('webgl-canvas');
            let webglContext = webglCanvas.getContext('webgl') || webglCanvas.getContext('experimental-webgl');
            webglCanvas.width = theCanvas.width = videoWidth;
            webglCanvas.height = theCanvas.height = videoHeight;

            let GL_TIME = 0;
            let GL_TIME_UNIFORM = null;

            prepareWebGL.call(this);

            this.play();

            drawScreen.call(this);

            function prepareWebGL(canvas, gl, sourceCanvas) {
                const program = webglContext.createProgram();

                let vertexCode = 'attribute vec2 coordinates;' +
                    'attribute vec2 texture_coordinates;' +
                    'varying vec2 v_texcoord;' +
                    'void main() {' +
                    '  gl_Position = vec4(coordinates, 0.0, 1.0);' +
                    '  v_texcoord = texture_coordinates;' +
                    '}';

                let vertexShader = webglContext.createShader(webglContext.VERTEX_SHADER);
                webglContext.shaderSource(vertexShader, vertexCode);
                webglContext.compileShader(vertexShader);

                let fragmentCode = 'precision mediump float;' +
                    'varying vec2 v_texcoord;' +
                    'uniform sampler2D u_texture;' +
                    'uniform float u_time;' +
                    'uniform vec2 u_resolution;' +
                    'vec2 uv;' +

                    'vec3 grayscale (vec3 color) {' +
                    '   return vec3(0.2126*color.r + 0.7152*color.g + 0.0722*color.b);' +
                    '}' +

                    'float rand(vec2 co){' +
                    '   return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);' +
                    '}' +

                    'float rand(float c){' +
                    '   return rand(vec2(c,1.0));' +
                    '}' +

                    'float randomLine(float seed){' +
                    '   float b = 0.01 * rand(seed);' +
                    '   float a = rand(seed+1.0);' +
                    '   float c = rand(seed+2.0) - 0.5;' +
                    '   float mu = rand(seed+3.0);' +
                    '   float l = 1.0;' +
                    '   if ( mu > 0.2)' +
                    '   l = pow(  abs(a * uv.x + b * uv.y + c ), 1.0/8.0 );' +
                    '   else' +
                    '   l = 2.0 - pow( abs(a * uv.x + b * uv.y + c), 1.0/8.0 );' +
                    '   return mix(0.5, 1.0, l);' +
                    '}' +

                    'float randomBlotch(float seed){' +
                    '	  float x = rand(seed);' +
                    '	  float y = rand(seed+1.0);' +
                    '	  float s = 0.01 * rand(seed+2.0);' +
                    '	  vec2 p = vec2(x,y) - uv;' +
                    '	  p.x *= u_resolution.x / u_resolution.y;' +
                    '	  float a = atan(p.y,p.x);' +
                    '	  float v = 1.0;' +
                    '	  float ss = s*s * (sin(6.2831*a*x)*0.1 + 1.0);' +
                    '	  if ( dot(p,p) < ss ) v = 0.2;' +
                    '	  else' +
                    '		v = pow(dot(p,p) - ss, 1.0/16.0);' +
                    '   return mix(0.3 + 0.2 * (1.0 - (s / 0.02)), 1.0, v);' +
                    '}' +

                    'void main() {' +
                    '   uv = v_texcoord.xy;' +
                    '   float t = float(int(u_time * 20.0));' +
                    // Сохраняем кадр
                    '   vec3 image = texture2D(u_texture, uv).rgb;' +
                    // Добавляем ч/б
                    '   float luma = dot( vec3(0.2126, 0.7152, 0.0722), image );' +
                    '   image = luma * vec3(0.7, 0.7, 0.7);' +
                    // Create a time-varyting vignetting effect
                    '   float vI = 16.0 * (uv.x * (1.0-uv.x) * uv.y * (1.0-uv.y));' +
                    'vI *= mix( 0.7, 1.0, rand(t + 0.5));' +
                    // Add additive flicker
                    'vI += 1.0 + 0.4 * rand(t+8.);' +
                    // Add a fixed vignetting (independent of the flicker)
                    'vI *= pow(16.0 * uv.x * (1.0-uv.x) * uv.y * (1.0-uv.y), 0.4);' +

                    // Случайные линии
                    'int l = int(8.0 * rand(t+7.0));' +
                    'if ( 0 < l ) vI *= randomLine( t+6.0+17.* float(0));' +
                    'if ( 1 < l ) vI *= randomLine( t+6.0+17.* float(1));' +
                    'if ( 2 < l ) vI *= randomLine( t+6.0+17.* float(2));' +
                    'if ( 3 < l ) vI *= randomLine( t+6.0+17.* float(3));' +
                    'if ( 4 < l ) vI *= randomLine( t+6.0+17.* float(4));' +
                    'if ( 5 < l ) vI *= randomLine( t+6.0+17.* float(5));' +
                    'if ( 6 < l ) vI *= randomLine( t+6.0+17.* float(6));' +
                    'if ( 7 < l ) vI *= randomLine( t+6.0+17.* float(7));' +

                    // Случайные пятна
                    'image = image * vI;' +
                    'gl_FragColor = vec4(image, 1.0);' +

                    // Черно-белый эффект (первоначальный метод)
                    // '   gl_FragColor = vec4(grayscale(texture2D(u_texture, v_texcoord).rgb), 1.0);' +
                    // Зернистость
                    '   gl_FragColor.xyz *= (1.0+(rand(uv+t*.01)-.2)*.15);	' +
                    '}';

                let fragmentShader = webglContext.createShader(webglContext.FRAGMENT_SHADER);
                webglContext.shaderSource(fragmentShader, fragmentCode);
                webglContext.compileShader(fragmentShader);

                webglContext.attachShader(program, vertexShader);
                webglContext.attachShader(program, fragmentShader);

                webglContext.linkProgram(program);
                webglContext.useProgram(program);

                let positionLocation = webglContext.getAttribLocation(program, 'coordinates');
                let texcoordLocation = webglContext.getAttribLocation(program, 'texture_coordinates');
                GL_TIME_UNIFORM = webglContext.getUniformLocation(program, 'u_time');
                let resolutionLocation = webglContext.getUniformLocation(program, 'u_resolution');
                webglContext.uniform2f(resolutionLocation, webglCanvas.width, webglCanvas.height);


                let buffer = webglContext.createBuffer();
                let vertices = [-1, -1,
                    1, -1, -1, 1, -1, 1,
                    1, -1,
                    1, 1
                ];
                webglContext.bindBuffer(webglContext.ARRAY_BUFFER, buffer);
                webglContext.bufferData(webglContext.ARRAY_BUFFER, new Float32Array(vertices), webglContext.STATIC_DRAW);
                webglContext.enableVertexAttribArray(positionLocation);
                webglContext.vertexAttribPointer(positionLocation, 2, webglContext.FLOAT, false, 0, 0);

                buffer = webglContext.createBuffer();
                let textureCoordinates = [
                    0, 1,
                    1, 1,
                    0, 0,
                    0, 0,
                    1, 1,
                    1, 0
                ];
                webglContext.bindBuffer(webglContext.ARRAY_BUFFER, buffer);
                webglContext.bufferData(webglContext.ARRAY_BUFFER, new Float32Array(textureCoordinates), webglContext.STATIC_DRAW);
                webglContext.enableVertexAttribArray(texcoordLocation);
                webglContext.vertexAttribPointer(texcoordLocation, 2, webglContext.FLOAT, false, 0, 0);

                let texture = webglContext.createTexture();
                webglContext.bindTexture(webglContext.TEXTURE_2D, texture);
                webglContext.texParameteri(webglContext.TEXTURE_2D, webglContext.TEXTURE_WRAP_S, webglContext.CLAMP_TO_EDGE);
                webglContext.texParameteri(webglContext.TEXTURE_2D, webglContext.TEXTURE_WRAP_T, webglContext.CLAMP_TO_EDGE);
                webglContext.texParameteri(webglContext.TEXTURE_2D, webglContext.TEXTURE_MIN_FILTER, webglContext.NEAREST);
                webglContext.texParameteri(webglContext.TEXTURE_2D, webglContext.TEXTURE_MAG_FILTER, webglContext.NEAREST);

            }

            function drawScreen(t) {
                if (this.video.videoElement.ended) {
                    return;
                }
                context.drawImage(this.video.videoElement, 0, 0, theCanvas.width, theCanvas.height);
                checkForSubtitles.call(this);
                if (t === undefined) {
                    t = 0;
                }
                let delta = t - this.previousTime;
                this.previousTime = t;
                postprocessWebGL(delta);
                requestAnimationFrame(drawScreen.bind(this));
            }

            function postprocessWebGL(delta) {
                GL_TIME += delta;
                webglContext.uniform1f(GL_TIME_UNIFORM, GL_TIME / 1000);

                webglContext.texImage2D(webglContext.TEXTURE_2D, 0, webglContext.RGBA, webglContext.RGBA, webglContext.UNSIGNED_BYTE, theCanvas);

                webglContext.viewport(0, 0, webglCanvas.width, webglCanvas.height);
                webglContext.enable(webglContext.DEPTH_TEST);
                webglContext.clear(webglContext.COLOR_BUFFER_BIT);
                webglContext.drawArrays(webglContext.TRIANGLES, 0, 6);
            }

            function checkForSubtitles() {
                if (this.subtitles.index === this.subtitles.data.length) {
                    return;
                }
                if (this.video.videoElement.currentTime >= this.subtitles.data[this.subtitles.index].endTime) {
                    if (!this.subtitles.flag) {
                        this.video.pause();
                        timerForSubtitles.call(this, 3000);
                        this.subtitles.flag = true;
                    }
                    drawSubtitlesPicture(this.subtitles.data[this.subtitles.index].text);
                }

            }

            function timerForSubtitles(delay) {
                setTimeout(() => {
                    this.subtitles.flag = false;
                    if (this.pauseFlag) {
                        return false;
                    }
                    this.video.play();
                    this.subtitles.index++;
                }, 3000);
            }

            function drawSubtitlesPicture(text) {
                const fontsize = theCanvas.width / 100 * 3;
                context.fillStyle = '#000000';
                context.fillRect(0, 0, theCanvas.width, theCanvas.height);
                context.fillStyle = '#D8D8D8';
                context.font = `${fontsize}px Oranienbaum`;
                context.textBaseline = 'middle';
                context.textAlign = 'center';
                createSubtitlesText(text, fontsize);
            }

            function createSubtitlesText(text, fontsize) {
                let lines = text.split('\n');
                lines.forEach((elem, i) => {
                    context.fillText(elem, theCanvas.width / 2, (theCanvas.height / 2) + i * fontsize);
                });
            }
        }
    }

    play() {
        this.pauseFlag = false;
        this.playButton.classList.add('player__button_hidden');
        this.pauseButton.classList.remove('player__button_hidden');
        this.video.play();
        this.song.play();
    }
    pause() {
        this.pauseFlag = true;
        this.pauseButton.classList.add('player__button_hidden');
        this.playButton.classList.remove('player__button_hidden');
        this.video.pause();
        this.song.pause();
    }
}
