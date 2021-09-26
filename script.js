class Popup {
  constructor() {
    this.template = `
    <div class="get-play-popup">
      <span class="get-play-popup__button">GetLinks</span>
      <textarea class="get-play-popup__result"></textarea>
    </div>
    `;
  }

  init() {
    let popupBody = document.createElement('div');

    popupBody.classList.add('get-play-popup__container');
    popupBody.innerHTML = this.template;
    document.body.prepend(popupBody);
    console.log('initial!');

    let button = popupBody.querySelector('.get-play-popup__button');

    button.addEventListener('click', this.clickOn );
  }

  clickOn() {
    let videoNodes = document.querySelectorAll('ytd-grid-video-renderer'),
        area = document.body.querySelector('.get-play-popup .get-play-popup__result'),
        baseLink = 'https://youtube.com';

    console.log();

    videoNodes.forEach(el => {
      let url = el.querySelector('ytd-thumbnail a#thumbnail').getAttribute('href');

      console.log(baseLink + url);
    })
  }
}

console.clear();

let popup = new Popup();

popup.init();
