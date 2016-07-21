import Player from './player';

export default class App {
    constructor() {
        // если ипсользовать ссылки со сторонних сайтов, то пригодится cors-сервер
        // const crossorigin = 'http://cors.io/?u=';
        const crossorigin = '';
        this.form = document.querySelector('.panel__form');
        this.pages = {
            'pageForm': document.querySelector('.page_content_form'),
            'pagePreloader': document.querySelector('.page_content_preloader'),
            'pagePlayer': document.querySelector('.page_content_player')
        };

        this.links = {
            video: '',
            subtitles: '',
            audio: ''
        };

        this.form.addEventListener('submit', onFormSubmit.bind(this));

        function onFormSubmit(e) {
            e.preventDefault();

            this.links.video = crossorigin + this.form.querySelector('[name="video"]').value;
            this.links.subtitles = crossorigin + this.form.querySelector('[name="subtitles"]').value;
            this.links.audio = crossorigin + this.form.querySelector('[name="audio"]').value;

            this.pages.pageForm.classList.add('page_hidden');
            this.pages.pagePreloader.classList.remove('page_hidden');
            this.pages.player = new Player(this.links, this.pages);
        }
    }
}
