import createPopupButton from './functions/popupButton';
import Popup from "./classes/popup";
import Parser from "./classes/parser";
import Items from "./classes/items";

export default ()=>{

    let url = location.href,
        arrUrl = url.split('/');

    if(arrUrl.indexOf('www.youtube.com') < 0) {
      return;
    }

    let genButt = createPopupButton(),
        pars = new Parser,
        popup = new Popup();

    popup.init();

    let items = new Items([pars.getNowPlayingVideo()], popup.body);

    items.create();


    genButt.addEventListener('click', ()=>{
      let activeClass = 'get-play__button--active';

      if(genButt.classList.contains(activeClass)) {
        genButt.classList.remove(activeClass);
      } else {
        genButt.classList.add(activeClass);
      }

      popup.visibility();

    });

    document.addEventListener('click', (e)=>{
      if(e.target.closest('.popup-row__name')) {
        let element = e.target.closest('.get-play__popup-row'),
            activeClass = 'popup-row__links--active',
            linksBlock = element.querySelector('.popup-row__links');

        if(!linksBlock.querySelector('iframe')) {
          items.addIframe(element);
        }

        if(linksBlock.classList.contains(activeClass)) {
          linksBlock.classList.remove(activeClass);
        } else {
          linksBlock.classList.add(activeClass);
        }

      }
    });

    let h1 = document.querySelector('#info h1.title');
    const observer = new MutationObserver(mutations => {
      items.updateNowPlaying(pars.getNowPlayingVideo())
    });

    observer.observe(h1, {
      childList: true,
      subtree: true,
      characterDataOldValue: false
    });

}





