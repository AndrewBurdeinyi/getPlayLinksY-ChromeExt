export default class Popup {

    constructor() {
        this.status = false;
    }

    init() {
        let popupBody = document.createElement('div');

        popupBody.classList.add('get-play__popup');
        document.body.prepend(popupBody);

        this.body = popupBody;
    }

    visibility() {
        let popupBody = document.querySelector('.get-play__popup');
        if(this.status) {
            popupBody.style.opacity = 0;
            setTimeout(()=>{
                popupBody.style.visibility = 'hidden';
                this.status = false;
            }, 500);
        } else {
            popupBody.style.visibility = 'visible';
            popupBody.style.opacity = 1;
            this.status = true;
        }

    }

}