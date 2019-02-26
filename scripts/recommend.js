import { Slider } from './slider.js';
import { lazyload } from './lazyload.js';
import { RECOMMEND_URL } from './constants.js';

export class Recommend {
    constructor(el) {
        this.$el = el;
    }

    launch() {
        fetch(RECOMMEND_URL)
            .then(res => res.json())
            .then(json => this.render(json))
        return this
    }


    render(json) {
        this.renderSlider(json.data.slider)
        this.renderRadios(json.data.radioList);
        this.renderPlaylists(json.data.songList);
        lazyload();
        // lazyload(document.querySelectorAll(".lazyload"));
    }
    renderSlider(slides) {
        new Slider({
            el: document.querySelector("#slider"),
            slides: slides.map(
                slide => ({link: slide.linkUrl, image: slide.picUrl.replace('http://','https://')})
            )            
            // el: document.querySelector("#slider"),
            // slides: slides.map(slide => {
            //     return {link: slide.linkUrl, image: slide.picUr.replce('http://','https://')}
            // })
        })
    }
    renderRadios(radios) {
        this.$el.querySelector(".radios .list").innerHTML = radios.map(radio =>
            `<div class="list-item">
                <div class="list-media">
                    <img class='lazyload' data-src="${radio.picUrl}" >
                    <span class="icon icon-play"></span>
                </div>
                <div class="list-title">${radio.Ftitle}</div>
            </div>`).join(""); 
    }
    renderPlaylists(playlists) {
        this.$el.querySelector(".playlists .list").innerHTML = playlists.map(list =>
            `<div class="list-item">
                <div class="list-media">
                    <img class='lazyload' data-src="${list.picUrl}" >
                    <span class="icon icon-play"></span>
                </div>
                <div class="list-title">${list.songListDesc}</div>
            </div>`).join("");
    }
}
