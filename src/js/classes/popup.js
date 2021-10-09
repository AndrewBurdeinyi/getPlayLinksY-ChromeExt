export default class Popup {

    init() {
        let popupBody = document.createElement('div');

        popupBody.classList.add('get-play__popup');
        document.body.prepend(popupBody);

        this.body = popupBody;
    }

    show() {
        this.body.style.visibility = 'visible';
        this.body.style.opacity = 1;
    }

    hide() {
        this.body.style.opacity = 0;
        setTimeout(()=>{
            this.body.style.visibility = 'hidden';
        }, 500);
    }

}