import Button from "./classes/button";
import Popup from "./classes/popup";
import Parser from "./classes/parser";
import Items from "./classes/items";
import observer from "./functions/observer";
import checkYtb from './functions/checkYtb';

export default ()=>{
  
  if(checkYtb()) return;

  let button = new Button,
      popup = new Popup,
      pars = new Parser;
      
  button.init();
  popup.init();
  
  let items = new Items(popup.body);

  observer(button, popup);

  button.body.addEventListener('click', ()=>{
    if (button.body.classList.contains('get-play__button--disable')) return;

    if(button.status) {
      button.close();
      popup.hide();
    } else {

      // let playlist = document.querySelectorAll('ytd-playlist-panel-video-renderer#playlist-items');

      if(items.status) {
        items.updateNowPlaying(pars.getNowPlayingVideo());
      } else {
        // let parsObj = (playlist.length > 0) ? [pars.getNowPlayingVideo(), pars.getPlaylistVideo()] : [pars.getNowPlayingVideo()];
        let parsObj = [pars.getNowPlayingVideo()];
        items.create(parsObj);
      }

      button.open()
      popup.show();
    }

  });

  document.addEventListener('click', (e)=>{
    if(e.target.closest('.popup-row__name')) {
      let element = e.target.closest('.get-play__popup-row'),
          activeClass = 'popup-row__links--active',
          linksBlock = element.querySelector('.popup-row__links');

      if(!linksBlock.querySelector('iframe')) {
        items.createIframe(element);
      }

      if(linksBlock.classList.contains(activeClass)) {
        linksBlock.classList.remove(activeClass);
      } else {
        linksBlock.classList.add(activeClass);
      }

    }
  });

}





