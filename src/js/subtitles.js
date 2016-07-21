import parser from 'subtitles-parser';


export default class Subtitles {
    constructor(link) {
        this.link = link;
        this.data = null;
        getFile.call(this);
        this.index = 0; // индекс текущих субтитров
        this.flag = false; // в видео еще не было субтитров

        function getFile() {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', link, true);
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                this.data = parser.fromSrt(xhr.responseText);
                this.parseData();
            }
        }
    }
    parseData() {
        this.data.forEach((elem) => {
            elem.startTime = countSeconds(elem.startTime);
            elem.endTime = countSeconds(elem.endTime);
        });

        function countSeconds(time) {
            time = time.replace(/,/g, '.');
            let hours = 60 * time.slice(0, 2);
            let minutes = 60 * (hours + Number(time.slice(3, 5)));
            let seconds = minutes + Number(time.slice(6, 12));
            return seconds;
        }

    }
}
