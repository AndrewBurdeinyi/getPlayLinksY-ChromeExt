export default ()=>{

    let start = document.getElementById('start');

    if(!start) {
        window.setTimeout(createPopupButton, 2000);
        return;
    }

    let button = document.createElement('div');

    button.classList.add('get-play__button');
    start.append(button);

    return button;

}