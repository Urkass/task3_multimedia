!function(e){function t(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(){window.app=new o["default"]}var a=i(1),o=n(a);document.addEventListener("DOMContentLoaded",r)},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=i(2),o=n(a),u=function s(){function e(e){e.preventDefault(),this.links.video=t+this.form.querySelector('[name="video"]').value,this.links.subtitles=t+this.form.querySelector('[name="subtitles"]').value,this.links.audio=t+this.form.querySelector('[name="audio"]').value,this.pagePlayer.classList.remove("page_hidden"),this.pageForm.classList.add("page_hidden"),this.player=new o["default"](this.links,this.pagePlayer)}r(this,s);var t="http://cors.io/?u=";this.form=document.querySelector(".panel__form"),this.pageForm=document.querySelector(".page_content_form"),this.pagePlayer=document.querySelector(".page_content_player"),this.links={video:"",subtitles:"",audio:""},this.form.addEventListener("submit",e.bind(this))};t["default"]=u},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),o=i(3),u=n(o),s=i(5),l=n(s),c=i(4),d=n(c),f=function(){function e(t,i){function n(e,t){function i(e,t,i){var n=d.createProgram(),r="attribute vec2 coordinates;attribute vec2 texture_coordinates;varying vec2 v_texcoord;void main() {  gl_Position = vec4(coordinates, 0.0, 1.0);  v_texcoord = texture_coordinates;}",a=d.createShader(d.VERTEX_SHADER);d.shaderSource(a,r),d.compileShader(a);var o="precision mediump float;varying vec2 v_texcoord;uniform sampler2D u_texture;uniform float u_time;uniform vec2 u_resolution;vec2 uv;vec3 grayscale (vec3 color) {   return vec3(0.2126*color.r + 0.7152*color.g + 0.0722*color.b);}float rand(vec2 co){   return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}float rand(float c){   return rand(vec2(c,1.0));}float randomLine(float seed){   float b = 0.01 * rand(seed);   float a = rand(seed+1.0);   float c = rand(seed+2.0) - 0.5;   float mu = rand(seed+3.0);   float l = 1.0;   if ( mu > 0.2)   l = pow(  abs(a * uv.x + b * uv.y + c ), 1.0/8.0 );   else   l = 2.0 - pow( abs(a * uv.x + b * uv.y + c), 1.0/8.0 );   return mix(0.5, 1.0, l);}float randomBlotch(float seed){\t  float x = rand(seed);\t  float y = rand(seed+1.0);\t  float s = 0.01 * rand(seed+2.0);\t  vec2 p = vec2(x,y) - uv;\t  p.x *= u_resolution.x / u_resolution.y;\t  float a = atan(p.y,p.x);\t  float v = 1.0;\t  float ss = s*s * (sin(6.2831*a*x)*0.1 + 1.0);\t  if ( dot(p,p) < ss ) v = 0.2;\t  else\t\tv = pow(dot(p,p) - ss, 1.0/16.0);   return mix(0.3 + 0.2 * (1.0 - (s / 0.02)), 1.0, v);}void main() {   uv = v_texcoord.xy;   float t = float(int(u_time * 20.0));   vec3 image = texture2D(u_texture, uv).rgb;   float luma = dot( vec3(0.2126, 0.7152, 0.0722), image );   image = luma * vec3(0.7, 0.7, 0.7);   float vI = 16.0 * (uv.x * (1.0-uv.x) * uv.y * (1.0-uv.y));vI *= mix( 0.7, 1.0, rand(t + 0.5));vI += 1.0 + 0.4 * rand(t+8.);vI *= pow(16.0 * uv.x * (1.0-uv.x) * uv.y * (1.0-uv.y), 0.4);int l = int(8.0 * rand(t+7.0));if ( 0 < l ) vI *= randomLine( t+6.0+17.* float(0));if ( 1 < l ) vI *= randomLine( t+6.0+17.* float(1));if ( 2 < l ) vI *= randomLine( t+6.0+17.* float(2));if ( 3 < l ) vI *= randomLine( t+6.0+17.* float(3));if ( 4 < l ) vI *= randomLine( t+6.0+17.* float(4));if ( 5 < l ) vI *= randomLine( t+6.0+17.* float(5));if ( 6 < l ) vI *= randomLine( t+6.0+17.* float(6));if ( 7 < l ) vI *= randomLine( t+6.0+17.* float(7));image = image * vI;gl_FragColor = vec4(image, 1.0);}",u=d.createShader(d.FRAGMENT_SHADER);d.shaderSource(u,o),d.compileShader(u),d.attachShader(n,a),d.attachShader(n,u),d.linkProgram(n),d.useProgram(n);var s=d.getAttribLocation(n,"coordinates"),l=d.getAttribLocation(n,"texture_coordinates");v=d.getUniformLocation(n,"u_time");var f=d.getUniformLocation(n,"u_resolution");d.uniform2f(f,c.width,c.height);var h=d.createBuffer(),m=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];d.bindBuffer(d.ARRAY_BUFFER,h),d.bufferData(d.ARRAY_BUFFER,new Float32Array(m),d.STATIC_DRAW),d.enableVertexAttribArray(s),d.vertexAttribPointer(s,2,d.FLOAT,!1,0,0),h=d.createBuffer();var p=[0,1,1,1,0,0,0,0,1,1,1,0];d.bindBuffer(d.ARRAY_BUFFER,h),d.bufferData(d.ARRAY_BUFFER,new Float32Array(p),d.STATIC_DRAW),d.enableVertexAttribArray(l),d.vertexAttribPointer(l,2,d.FLOAT,!1,0,0);var y=d.createTexture();d.bindTexture(d.TEXTURE_2D,y),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_S,d.CLAMP_TO_EDGE),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_T,d.CLAMP_TO_EDGE),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MIN_FILTER,d.NEAREST),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MAG_FILTER,d.NEAREST)}function n(e){void 0===e&&(e=0);var t=e-this.previousTime;this.previousTime=e,l.drawImage(this.video.videoElement,0,0,s.width,s.height),a.call(this),r(t),requestAnimationFrame(n.bind(this))}function r(e){f+=e,d.uniform1f(v,f/1e3),d.texImage2D(d.TEXTURE_2D,0,d.RGBA,d.RGBA,d.UNSIGNED_BYTE,s),d.viewport(0,0,c.width,c.height),d.enable(d.DEPTH_TEST),d.clear(d.COLOR_BUFFER_BIT),d.drawArrays(d.TRIANGLES,0,6)}function a(){this.video.videoElement.currentTime>=this.subtitles.data[this.subtitles.index].endTime&&(this.subtitles.flag||(this.video.pause(),o.call(this,3e3),this.subtitles.flag=!0),u(this.subtitles.data[this.subtitles.index].text))}function o(e){var t=this;setTimeout(function(){t.video.play(),t.subtitles.flag=!1,t.subtitles.index++},3e3)}function u(e){l.fillStyle="#000000",l.fillRect(0,0,s.width,s.height),l.fillStyle="white",l.font="30px Oranienbaum",l.textBaseline="middle",l.textAlign="center",l.fillText(e,s.width/2,s.height/2)}var s=document.getElementById("canvas"),l=s.getContext("2d"),c=document.getElementById("webgl-canvas"),d=c.getContext("webgl")||c.getContext("experimental-webgl");c.width=s.width=e,c.height=s.height=t;var f=0,v=null;i.call(this),this.play(),n.call(this)}var a=this;r(this,e),this.pagePlayer=i,this.player=i.querySelector(".player"),this.playButton=this.player.querySelector(".player__play"),this.stopButton=this.player.querySelector(".player__stop"),this.video=new l["default"](t.video,this.pagePlayer),this.song=new u["default"](t.audio),this.subtitles=new d["default"](t.subtitles),this.previousTime=0,this.video.videoElement.addEventListener("canplaythrough",function(){n.call(a,a.video.videoElement.videoWidth,a.video.videoElement.videoHeight)}),this.playButton.addEventListener("click",function(){a.play()}),this.stopButton.addEventListener("click",function(){a.pause()})}return a(e,[{key:"play",value:function(){this.video.play(),this.song.play()}},{key:"pause",value:function(){this.video.pause(),this.song.pause()}}]),e}();t["default"]=f},function(e,t){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=function(){function e(t){i(this,e),this.link=t,this.audio=new Audio(t),this.audio.crossOrigin="anonymous",this.context=new(window.AudioContext||window.webkitAudioContext),this.source=this.context.createMediaElementSource(this.audio);var n=this.context.createWaveShaper(),r=this.context.createBiquadFilter();r.type="lowpass",r.frequency.value=1e3,r.gain.value=20,this.source.connect(n),n.connect(r),r.connect(this.context.destination)}return n(e,[{key:"addDirtyEffects",value:function(){}},{key:"generateWHiteNoize",value:function(){var e=4096,t=function(){var t,i,n,r,a,o,u;t=i=n=r=a=o=u=0;var s=this.context.createScriptProcessor(e,1,1);return s.onaudioprocess=function(s){for(var l=s.outputBuffer.getChannelData(0),c=0;c<e;c++){var d=2*Math.random()-1;t=.99886*t+.0555179*d,i=.99332*i+.0750759*d,n=.969*n+.153852*d,r=.8665*r+.3104856*d,a=.55*a+.5329522*d,o=-.7616*o-.016898*d,l[c]=t+i+n+r+a+o+u+.5362*d,l[c]*=22.9,u=.115926*d}},s}.bind(this)();t.connect(this.context.destination)}},{key:"play",value:function(){this.audio.play()}},{key:"pause",value:function(){this.audio.pause()}}]),e}();t["default"]=r},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),o=i(6),u=n(o),s=function(){function e(t){function i(){var e=new XMLHttpRequest;if(e.open("GET",t,!1),e.send(),200===e.status)return u["default"].fromSrt(e.response)}r(this,e),this.link=t,this.data=i(),this.parseData(),this.index=0,this.flag=!1}return a(e,[{key:"parseData",value:function(){function e(e){e=e.replace(/,/g,".");var t=60*e.slice(0,2),i=60*(t+Number(e.slice(3,5))),n=i+Number(e.slice(6,12));return n}this.data.forEach(function(t){t.startTime=e(t.startTime),t.endTime=e(t.endTime)})}}]),e}();t["default"]=s},function(e,t){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=function(){function e(t,n){i(this,e),this.videoElement=document.createElement("video"),this.videoElement.setAttribute("crossorigin","anonymous"),this.videoDiv=document.createElement("div"),n.appendChild(this.videoDiv),this.videoDiv.appendChild(this.videoElement),this.videoDiv.setAttribute("style","display:none;"),this.videoElement.setAttribute("src",t),this.videoElement.muted=!0}return n(e,[{key:"play",value:function(){this.videoElement.play()}},{key:"pause",value:function(){this.videoElement.pause()}}]),e}();t["default"]=r},function(e,t,i){var n=function(){var e={};e.fromSrt=function(e,i){var n=!!i;e=e.replace(/\r/g,"");var r=/(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;e=e.split(r),e.shift();for(var a=[],o=0;o<e.length;o+=4)a.push({id:e[o].trim(),startTime:n?t(e[o+1].trim()):e[o+1].trim(),endTime:n?t(e[o+2].trim()):e[o+2].trim(),text:e[o+3].trim()});return a},e.toSrt=function(e){if(!e instanceof Array)return"";for(var t="",n=0;n<e.length;n++){var r=e[n];isNaN(r.startTime)||isNaN(r.endTime)||(r.startTime=i(parseInt(r.startTime,10)),r.endTime=i(parseInt(r.endTime,10))),t+=r.id+"\r\n",t+=r.startTime+" --> "+r.endTime+"\r\n",t+=r.text.replace("\n","\r\n")+"\r\n\r\n"}return t};var t=function(e){var t=/(\d+):(\d{2}):(\d{2}),(\d{3})/,i=t.exec(e);if(null===i)return 0;for(var n=1;n<5;n++)i[n]=parseInt(i[n],10),isNaN(i[n])&&(i[n]=0);return 36e5*i[1]+6e4*i[2]+1e3*i[3]+i[4]},i=function(e){var t=[36e5,6e4,1e3],i=[];for(var n in t){var r=(e/t[n]>>0).toString();r.length<2&&(r="0"+r),e%=t[n],i.push(r)}var a=e.toString();if(a.length<3)for(n=0;n<=3-a.length;n++)a="0"+a;return i.join(":")+","+a};return e}();e.exports=n}]);
//# sourceMappingURL=bundle.js.map