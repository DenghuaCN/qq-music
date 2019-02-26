import { searchUrl } from './helpers.js'

export class Search {
    constructor(el) {
        this.$el = el;
        this.$input = this.$el.querySelector("#search");       
        this.$input.addEventListener("keyup",this.onKeyUp.bind(this));
        this.$songs = this.$el.querySelector(".song-list");
        this.keyword = '';
        this.page = 1;
        this.songs = [];
        this.nomore = false;
        this.fetching = false;
        this.perpage = 20;

        this.onscroll = this.onScroll.bind(this);
        window.addEventListener("scroll",this.onscroll);
    }


    onKeyUp(event) {
        let keyword = event.target.value.trim();
        if (!keyword) return this.reset();
        if (event.keyCode !== 13) return;
        this.search(keyword);
    }

    onScroll(event) {
        if (this.nomore) return window.removeEventListener("scroll",this.onscroll);
        if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 50) {
            this.search(this.keyword,this.page + 1)
            
        }
    }

    reset() {
        this.page = 1;
        this.keyword = '';
        this.songs = [];
        this.$songs.innerHTML = '';
    }

    search(keyword,page) {
        if (this.fetching) return;

        this.keyword = keyword;
        this.fetching = true;
        // https://qq-music-api.now.sh/search?keyword=eason&page=2
        
        // fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${page || this.page}`)
        fetch(searchUrl(this.keyword, page || this.page))
            .then(res => res.json())
            .then(json => {
                this.page = json.data.song.curpage;
                this.nomore = Boolean(json.message === 'no results');
                this.songs.push(...json.data.song.list);
                
                return json.data.song.list;
            })
            .then(songs => this.append(songs))
            .then(() => this.fetching = false) 
            .catch(() => this.fetching = false)
    }

    append(songs) {
        let html = songs.map(song => {
            let artist = song.singer.map(s => s.name).join('')
            
            return `<a class='song-item' href='#player?artist=${artist}&songid=${song.songid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}&songmid=${song.songmid}'>
                <i class='icon icon-music'></i>
                <div class='song-name ellipsis'>${song.songname}</div>
                <div class='song-artist ellipsis'>${artist}</div>
            </a>`}).join('')

        this.$songs.insertAdjacentHTML("beforeend", html);
    }

}