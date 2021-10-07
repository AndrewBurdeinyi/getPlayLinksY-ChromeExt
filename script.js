// CLASSES

class Popup {
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

class Items {
  constructor(parsResult, popup) {
    this.elements = parsResult;
    this.popup = popup;
  }
  create() {
    for(let key in this.elements) {
      let part = this.elements[key],
          title = document.createElement('h2'),
          items = document.createElement('div')

      title.classList.add('get-play__popup-title');
      title.innerText = part.sectionName;

      for(let key in part.items) {
        let item = part.items[key],
            element = `
            <div class="popup-row__name">${item.name}</div>
            <div class="popup-row__links" data-video-id="${item.id}">
              <div class="popup-row__iframe-preloader"><div>Loading...</div></div>
            </div>
            <div class="popup-row__iframe-status"></div>
        `,
            elementContainer = document.createElement('div');

        elementContainer.classList.add('get-play__popup-row');
        elementContainer.innerHTML = element;
        items.append(elementContainer);
      }

      items.setAttribute('id', part.id);
      this.popup.append(title);
      this.popup.append(items);
    }
  }

  updateNowPlaying(parsObj) {
    let nowBlock = this.popup.querySelector('#nowPlaying'),
        name = nowBlock.querySelector('.popup-row__name'),
        iframe = nowBlock.querySelector('iframe'),
        link = nowBlock.querySelector('.popup-row__links'),
        preloader = nowBlock.querySelector('.popup-row__iframe-preloader'),
        status = nowBlock.querySelector('.popup-row__iframe-status');

    iframe.remove();
    preloader.removeAttribute('style');
    status.removeAttribute('style');
    name.innerHTML = parsObj.items[0].name;
    link.classList.remove('popup-row__links--active');
    link.setAttribute('data-video-id', parsObj.items[0].id);
  }

  addIframe(item) {
    let container = item.querySelector('.popup-row__links'),
        videoID = container.getAttribute('data-video-id'),
        status = item.querySelector('.popup-row__iframe-status'),
        preloader = item.querySelector('.popup-row__iframe-preloader'),
        iframe = document.createElement('iframe');

    status.setAttribute('style', 'background:yellow;');
    iframe.addEventListener('load', ()=>{
      preloader.setAttribute('style', 'display:none;');
      status.setAttribute('style', 'background:green;');
    });

    iframe.setAttribute('src', `https://www.yt-download.org/api/widget/mp3/${videoID}`);
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '100%');
    iframe.setAttribute('allowTransparency', 'true');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('style', 'border:none;');

    container.append(iframe);

  }
}

class Parser {

  getNowPlayingVideo() {
    let name = document.querySelector('#info h1.title').textContent,
        id = document.querySelector('ytd-watch-flexy[video-id]').getAttribute('video-id');

    return {
      'sectionName': 'Now Playing:',
      'id': 'nowPlaying',
      'items': [
        {
          'name': name,
          'id': id,
        },
      ],
    }
  }

  getPlaylistVideo() {
    let playlist = document.getElementById('playlist'),
        playlistItems = playlist.querySelectorAll('ytd-playlist-panel-video-renderer#playlist-items'),
        items = [];

    playlistItems.forEach(el=>{
      let name = el.querySelector('#video-title').getAttribute('title'),
          href = el.querySelector('#thumbnail').getAttribute('href'),
          id = href.split('?v=')[1].split('&list')[0];

      items.push({
        'name': name,
        'id': id,
      });
    });

    return {
      'sectionName': 'Playlist:',
      'id': 'playlist',
      'items': items,
    }
  }

}



// FUNCTIONS

function createPopupButton() {
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


// LOGIC

window.addEventListener('load', () => {

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

});



