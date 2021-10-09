export default class Button { 

    constructor() {
        this.activeClass = 'get-play__button--active';
        this.status = false;
    }
    
    init() {
        let start = document.getElementById('start');

        if(!start) {
            window.setTimeout(this.init(), 2000);
            return;
        }

        let button = document.createElement('div');

        button.classList.add('get-play__button');
        if(!document.querySelector('#primary-inner>#player.style-scope')) {
            button.classList.add('get-play__button--disable');
        } 
        start.append(button);

        this.body = button
    }

    open() {
        this.body.classList.add(this.activeClass);
        this.status = true;
    }

    close() {
        this.body.classList.remove(this.activeClass);
        this.status = false;
    }

    disable() {
        this.body.classList.add('get-play__button--disable');
    }

    enable() {
        this.body.classList.remove('get-play__button--disable');
    }
}