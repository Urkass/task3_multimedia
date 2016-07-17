import Player from './player';

export default class App {
    constructor() {

        this.form = document.querySelector('.panel__form');
        this.pageForm = document.querySelector('.page_content_form');
        this.pagePlayer = document.querySelector('.page_content_player');

        this.links = {
            video: '',
            subtitles: '',
            audio: ''
        };

        this.form.addEventListener('submit', onFormSubmit.bind(this));

        function onFormSubmit(e) {
            e.preventDefault();

            this.links.video = this.form.querySelector(`[name="video"]`).value;
            this.links.subtitles = this.form.querySelector(`[name="subtitles"]`).value;
            this.links.audio = this.form.querySelector(`[name="audio"]`).value;


            this.pagePlayer.classList.remove('page_hidden');
            this.pageForm.classList.add('page_hidden');
            this.player = new Player(this.links, this.pagePlayer);
        }
    }
}
