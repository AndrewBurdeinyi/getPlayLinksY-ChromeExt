export default class Parser {

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