export default class Items {

    constructor(popup) {
        this.popup = popup;
        this.status = false;
    }

    create(parsArr) {
        for(let key in parsArr) {
            let part = parsArr[key],
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
            this.status = true;
        }
    }

    updateNowPlaying(parsObj) {
        let nowBlock = this.popup.querySelector('#nowPlaying'),
            name = nowBlock.querySelector('.popup-row__name'),
            iframe = nowBlock.querySelector('iframe'),
            link = nowBlock.querySelector('.popup-row__links'),
            preloader = nowBlock.querySelector('.popup-row__iframe-preloader'),
            status = nowBlock.querySelector('.popup-row__iframe-status');

        if(name.textContent == parsObj.items[0].name) return;

        if(iframe) {
            iframe.remove();
        }
        preloader.removeAttribute('style');
        status.removeAttribute('style');
        name.innerHTML = parsObj.items[0].name;
        link.classList.remove('popup-row__links--active');
        link.setAttribute('data-video-id', parsObj.items[0].id);
    }

    createIframe(item) {
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