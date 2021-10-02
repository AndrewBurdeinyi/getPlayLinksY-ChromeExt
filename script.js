// CLASSES

class Parser {
  getNowPlayingVideo() {
    let name = document.querySelector('h1.title').textContent,
        id = document.querySelector('ytd-watch-flexy[video-id]').getAttribute('video-id');

    return {
      'sectionName': 'Now Playing:',
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
      'items': items,
    }
  }
}

class Popup {
  constructor(elements) {
    this.elements = elements;
    this.status = false;
  }

  init() {
    let popupBody = document.createElement('div');

    popupBody.classList.add('get-play__popup');
    document.body.prepend(popupBody);

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
            <div class="popup-row__links">
              <iframe src="https://www.yt-download.org/api/button/videos/${item.id}" width="50%" height="100px" scrolling="no" style="border:none;"></iframe>
              <iframe src="https://www.yt-download.org/api/button/mp3/${item.id}" width="50%" height="100px" scrolling="no" style="border:none;"></iframe>
            </div>
        `,
            elementContainer = document.createElement('div');

        elementContainer.classList.add('get-play__popup-row');
        elementContainer.innerHTML = element;
        items.append(elementContainer);
      }

      popupBody.append(title);
      popupBody.append(items);
    }
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


// FUNCTIONS

function getStartBlock() {
  let start = document.getElementById('start');
  if(!start) {
    window.setTimeout(getStartBlock, 5000);
    return;
  }
  return start;
}

function createPopupButton(parrent) {
  let button = document.createElement('div');

  button.classList.add('get-play__button');
  parrent.append(button);

  return button;
}


// LOGIC

window.addEventListener('load', () => {

  let start = getStartBlock(),
      genButt = createPopupButton(start),
      pars = new Parser,
      popup = new Popup([pars.getNowPlayingVideo(), pars.getPlaylistVideo()]);

  popup.init();


  genButt.addEventListener('click', ()=>{
    // console.clear();
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
      let item = e.target.closest('.get-play__popup-row'),
          activeClass = 'popup-row__links--active',
          linksBlock = item.querySelector('.popup-row__links');

      if(linksBlock.classList.contains(activeClass)) {
        linksBlock.classList.remove(activeClass);
      } else {
        linksBlock.classList.add(activeClass);
      }
    }
  });

});



