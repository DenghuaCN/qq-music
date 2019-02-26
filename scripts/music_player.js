import { lyricsPlayer } from './lyrics_player.js';
import { ProgressBar } from './progress_bar.js';
import {songUrl, lyricsUrl, albumCoverUrl, songUrl2} from './helpers.js';

export class MusicPlayer {

    constructor(el) {
        this.$el = el;
        this.$el.addEventListener("click", this)

        this.$audio = this.createAudio();
        this.lyrics = new lyricsPlayer(this.$el.querySelector('.player-lyrics'),this.$audio);
        this.progress = new ProgressBar(this.$el.querySelector(".progress"), 0, true);    // new ProgressBar(el,duration,start)

        this.showPlayer();

    }

    showPlayer() {
        let that = this;

        this.showPlayerBtn = document.querySelector("#show-player");
        this.showPlayerBtn.addEventListener("click",function() {
            that.show();
        });
    }

    createAudio() {
        let audio = document.createElement("audio");
        audio.addEventListener('ended',() => {
            this.$audio.play()
            this.lyrics.restart();
            this.progress.restart();
            console.log('ended');
        })
        document.body.appendChild(audio);
        return audio;
    }

    handleEvent(event) {
        let target = event.target;
        switch (true) {
            case target.matches(".icon-play"):
                this.onPlay(event);
                break;
            case target.matches(".icon-pause"):
                this.onPause(event);
                break;
            case target.matches(".icon-list"):
                this.hide();
                break;
        }
    }

    onPlay(event) {
        this.$audio.play();
        this.lyrics.start();
        this.progress.start();

        event.target.classList.add("icon-pause");
        event.target.classList.remove("icon-play");
    }
    onPause(event) {
        this.$audio.pause();
        this.lyrics.pause();
        this.progress.pause();

        event.target.classList.add("icon-play");
        event.target.classList.remove("icon-pause");
    }


    show() {
        this.$el.classList.add("show");
        document.body.classList.add("noscroll");
    }

    hide() {
        this.$el.classList.remove("show");
        document.body.classList.remove("noscroll");
    }

    play(options = {}) {
        if (!options) return;
        console.log(options);

        this.$el.querySelector('.song-name').innerText = decodeURIComponent(options.songname);
        this.$el.querySelector('.song-artist').innerText = decodeURIComponent(options.artist);
        this.progress.reset(options.duration);

        // let url = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${options.albummid}.jpg?max_age=2592000`;
        let url = albumCoverUrl(options.albummid);
        this.$el.querySelector('.album-cover').src = url;
        this.$el.querySelector('.player-background').style.backgroundImage = `url(${url})`;
        console.log(options.songname);
        console.log(options.songmid);


        if (options.songid) {
            this.songid = options.songid;
            this.songmid = options.songmid;

            /**
             * 2019年2月24日 06:32:04
             * 歌曲m4a文件请求，必须的query string为guid和vkey
             * guid不变.可能会被官方改动，可以去https://y.qq.com/m/index.html听歌抓取查看以便更改.
             * vkey较难
             */
            // this.$audio.src = `http://dl.stream.qqmusic.qq.com/C400${this.songmid}.m4a?guid=4861199277&vkey=D1DE18BD76B603836D4BA91B100F9376E7DDAB9CC0BD21C3E569525CC4C7E8715F9901974A78D174BA2FCE9DFCA0DA92D3DCED779F49E4DD`;
            this.$audio.src = songUrl2(this.songmid);

            // fetch(`https://qq-music-api.now.sh/lyrics?id=${this.songid}`)
            fetch(lyricsUrl(this.songid))
                .then(res => res.json())
                .then(json => json.lyric)
                .then(text => this.lyrics.reset(text))
                .catch(() => {})
        }
        this.show();
    }
}