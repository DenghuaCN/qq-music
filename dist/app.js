/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var RECOMMEND_URL = exports.RECOMMEND_URL = 'https://qq-music-api.now.sh';
var TOPLIST_URL = exports.TOPLIST_URL = 'https://qq-music-api.now.sh/top';
var SEARCH_URL = exports.SEARCH_URL = 'https://qq-music-api.now.sh/search';
var LYRICS_URL = exports.LYRICS_URL = 'https://qq-music-api.now.sh/lyrics';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lyricsUrl = lyricsUrl;
exports.songUrl = songUrl;
exports.albumCoverUrl = albumCoverUrl;
exports.songUrl2 = songUrl2;
exports.searchUrl = searchUrl;

var _constants = __webpack_require__(0);

function lyricsUrl(songid) {
    return _constants.LYRICS_URL + '?id=' + songid;
}
function songUrl(id) {
    return 'http://dl.stream.qqmusic.qq.com/C400' + id + '.m4a?guid=4861199277&vkey=D1DE18BD76B603836D4BA91B100F9376E7DDAB9CC0BD21C3E569525CC4C7E8715F9901974A78D174BA2FCE9DFCA0DA92D3DCED779F49E4DD';
}
function albumCoverUrl(id) {
    return 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + id + '.jpg?max_age=2592000';
}
function songUrl2(mid) {
    return 'http://dl.stream.qqmusic.qq.com/C400' + mid + '.m4a?guid=4861199277&vkey=6852F88C4A479AF91A5793A8955326696E87C84DE8D240267AD37739F69FEB5CFB05C9466EAC25FF06D2471738F8565C32A2B3FAFDA2819B';
}

function searchUrl(keyword) {
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    return _constants.SEARCH_URL + '?keyword=' + keyword + '&page=' + page;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lazyload = lazyload;
function lazyload(images) {
    var imgs = [].slice.call(images || document.querySelectorAll('.lazyload'));

    var onscroll = throttle(function () {
        if (imgs.length === 0) {
            return window.removeEventListener("scroll", onscroll);
        }

        imgs = imgs.filter(function (img) {
            return img.classList.contains("lazyload");
        });
        imgs.forEach(function (img) {
            if (inViewport(img)) {
                loadImage(img);
            }
        });
    }, 500);

    window.addEventListener("scroll", onscroll);
    window.dispatchEvent(new Event('scroll'));
}

function throttle(fn, wait) {
    var prev = void 0,
        timer = void 0;
    return function () {
        var curr = Date.now();
        var diff = curr - prev;
        if (!prev || diff >= wait) {
            fn();
            prev = curr;
        } else if (diff < wait) {
            clearTimeout(timer);
            timer = setTimeout(fn, wait - diff);
        }
    };
}

function inViewport(img) {
    var _img$getBoundingClien = img.getBoundingClientRect(),
        top = _img$getBoundingClien.top,
        left = _img$getBoundingClien.left,
        right = _img$getBoundingClien.right,
        bottom = _img$getBoundingClien.bottom;

    var vpWidth = document.documentElement.clientWidth;
    var vpHeight = document.documentElement.clientHeight;

    return (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) && (left > 0 && left < vpWidth || right > 0 && right < vpWidth);
}

function loadImage(img) {
    var image = new Image();
    image.src = img.dataset.src;
    image.onload = function () {
        img.src = image.src;
        // img.style.height = (173/document.documentElement.clientHeight) + "px";
        img.classList.remove("lazyload");
    };
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

var _search = __webpack_require__(5);

var _toplist = __webpack_require__(6);

var _recommend = __webpack_require__(7);

var _music_player = __webpack_require__(9);

var recommend = new _recommend.Recommend(document.querySelector('.rec-view')).launch();
var topList = new _toplist.TopList(document.querySelector('.rank-view')).launch();
var search = new _search.Search(document.querySelector('.search-view'));
var player = new _music_player.MusicPlayer(document.querySelector('#player'));

onHashChange();
addEventListener('hashchange', onHashChange);

function onHashChange() {
    var hash = location.hash;

    if (/^#player\?.+/.test(hash)) {
        var matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g);
        var options = matches && matches.reduce(function (res, cur) {
            var arr = cur.split('=');
            res[arr[0]] = decodeURIComponent(arr[1]);
            return res;
        }, {});

        player.play(options);
    } else {
        player.hide();
    }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("click", function (event) {
    var target = event.target;

    if (target.dataset.role !== "tab") return;

    [].forEach.call(target.parentElement.children, function (tab) {
        tab.classList.remove("active");
    });
    target.classList.add("active");

    var content = document.querySelector(target.dataset.view);
    if (content) {
        [].forEach.call(content.parentElement.children, function (child) {
            child.style.display = "none";
        });
        content.style.display = "block";
        window.dispatchEvent(new Event('scroll'));
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Search = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(1);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Search = exports.Search = function () {
    function Search(el) {
        _classCallCheck(this, Search);

        this.$el = el;
        this.$input = this.$el.querySelector("#search");
        this.$input.addEventListener("keyup", this.onKeyUp.bind(this));
        this.$songs = this.$el.querySelector(".song-list");
        this.keyword = '';
        this.page = 1;
        this.songs = [];
        this.nomore = false;
        this.fetching = false;
        this.perpage = 20;

        this.onscroll = this.onScroll.bind(this);
        window.addEventListener("scroll", this.onscroll);
    }

    _createClass(Search, [{
        key: "onKeyUp",
        value: function onKeyUp(event) {
            var keyword = event.target.value.trim();
            if (!keyword) return this.reset();
            if (event.keyCode !== 13) return;
            this.search(keyword);
        }
    }, {
        key: "onScroll",
        value: function onScroll(event) {
            if (this.nomore) return window.removeEventListener("scroll", this.onscroll);
            if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 50) {
                this.search(this.keyword, this.page + 1);
            }
        }
    }, {
        key: "reset",
        value: function reset() {
            this.page = 1;
            this.keyword = '';
            this.songs = [];
            this.$songs.innerHTML = '';
        }
    }, {
        key: "search",
        value: function search(keyword, page) {
            var _this = this;

            if (this.fetching) return;

            this.keyword = keyword;
            this.fetching = true;
            // https://qq-music-api.now.sh/search?keyword=eason&page=2

            // fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${page || this.page}`)
            fetch((0, _helpers.searchUrl)(this.keyword, page || this.page)).then(function (res) {
                return res.json();
            }).then(function (json) {
                var _songs;

                _this.page = json.data.song.curpage;
                _this.nomore = Boolean(json.message === 'no results');
                (_songs = _this.songs).push.apply(_songs, _toConsumableArray(json.data.song.list));

                return json.data.song.list;
            }).then(function (songs) {
                return _this.append(songs);
            }).then(function () {
                return _this.fetching = false;
            }).catch(function () {
                return _this.fetching = false;
            });
        }
    }, {
        key: "append",
        value: function append(songs) {
            var html = songs.map(function (song) {
                var artist = song.singer.map(function (s) {
                    return s.name;
                }).join('');

                return "<a class='song-item' href='#player?artist=" + artist + "&songid=" + song.songid + "&songname=" + song.songname + "&albummid=" + song.albummid + "&duration=" + song.interval + "&songmid=" + song.songmid + "'>\n                <i class='icon icon-music'></i>\n                <div class='song-name ellipsis'>" + song.songname + "</div>\n                <div class='song-artist ellipsis'>" + artist + "</div>\n            </a>";
            }).join('');

            this.$songs.insertAdjacentHTML("beforeend", html);
        }
    }]);

    return Search;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TopList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lazyload = __webpack_require__(2);

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TopList = exports.TopList = function () {
    function TopList(el) {
        _classCallCheck(this, TopList);

        this.$el = el;
    }

    _createClass(TopList, [{
        key: 'launch',
        value: function launch() {
            var _this = this;

            fetch(_constants.TOPLIST_URL).then(function (res) {
                return res.json();
            }).then(function (json) {
                return _this.render(json.data.topList);
            });
            return this;
        }
    }, {
        key: 'render',
        value: function render(list) {
            var _this2 = this;

            this.$el.querySelector('.toplist').innerHTML = list.map(function (item) {
                return '<li class="top-item">\n            <div class="top-item-media">\n                <a href="#"><img class=\'lazyload\' data-src="' + item.picUrl + '"></a>\n            </div>\n            <div class="top-item-info">\n                <h3 class="top-item-title ellipsis">' + item.topTitle + '</h3>\n                <ul class="top-item-list">\n                    ' + _this2.songlist(item.songList) + '\n                </ul>\n            </div>\n        </li>';
            }).join("");

            (0, _lazyload.lazyload)(this.$el.querySelectorAll(".lazyload"));
        }
    }, {
        key: 'songlist',
        value: function songlist(songs) {
            return songs.map(function (song, i) {
                return '<li class="top-item-song">\n            <i class="song-index">' + (i + 1) + '</i>\n            <span class="song-name">' + song.songname + '</span> - ' + song.singername + '\n        </li>';
            }).join("");
        }
    }]);

    return TopList;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Recommend = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slider = __webpack_require__(8);

var _lazyload = __webpack_require__(2);

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recommend = exports.Recommend = function () {
    function Recommend(el) {
        _classCallCheck(this, Recommend);

        this.$el = el;
    }

    _createClass(Recommend, [{
        key: 'launch',
        value: function launch() {
            var _this = this;

            fetch(_constants.RECOMMEND_URL).then(function (res) {
                return res.json();
            }).then(function (json) {
                return _this.render(json);
            });
            return this;
        }
    }, {
        key: 'render',
        value: function render(json) {
            this.renderSlider(json.data.slider);
            this.renderRadios(json.data.radioList);
            this.renderPlaylists(json.data.songList);
            (0, _lazyload.lazyload)();
            // lazyload(document.querySelectorAll(".lazyload"));
        }
    }, {
        key: 'renderSlider',
        value: function renderSlider(slides) {
            new _slider.Slider({
                el: document.querySelector("#slider"),
                slides: slides.map(function (slide) {
                    return { link: slide.linkUrl, image: slide.picUrl.replace('http://', 'https://') };
                })
                // el: document.querySelector("#slider"),
                // slides: slides.map(slide => {
                //     return {link: slide.linkUrl, image: slide.picUr.replce('http://','https://')}
                // })
            });
        }
    }, {
        key: 'renderRadios',
        value: function renderRadios(radios) {
            this.$el.querySelector(".radios .list").innerHTML = radios.map(function (radio) {
                return '<div class="list-item">\n                <div class="list-media">\n                    <img class=\'lazyload\' data-src="' + radio.picUrl + '" >\n                    <span class="icon icon-play"></span>\n                </div>\n                <div class="list-title">' + radio.Ftitle + '</div>\n            </div>';
            }).join("");
        }
    }, {
        key: 'renderPlaylists',
        value: function renderPlaylists(playlists) {
            this.$el.querySelector(".playlists .list").innerHTML = playlists.map(function (list) {
                return '<div class="list-item">\n                <div class="list-media">\n                    <img class=\'lazyload\' data-src="' + list.picUrl + '" >\n                    <span class="icon icon-play"></span>\n                </div>\n                <div class="list-title">' + list.songListDesc + '</div>\n            </div>';
            }).join("");
        }
    }]);

    return Recommend;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = exports.Slider = function () {
    function Slider() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Slider);

        this.$el = options.el;
        this.slides = options.slides;
        this.interval = options.interval || 3000;
        this.index = 0;

        this.render();
        this.start();
    }

    _createClass(Slider, [{
        key: 'render',
        value: function render() {
            this.$el.innerHTML = '<div class="qq-slider-wrap"></div>';
            this.$wrap = this.$el.firstElementChild;
            this.$wrap.style.width = this.slides.length * 100 + '%';

            var slide = function slide(obj) {
                return '<div class="qq-slider-item">\n                <a href="' + obj.link + '">\n                    <img src="' + obj.image + '">\n                </a>\n            </div>';
            };
            this.$wrap.innerHTML = this.slides.map(slide).join('');
        }
    }, {
        key: 'start',
        value: function start() {
            setInterval(this.next.bind(this), this.interval);
        }
    }, {
        key: 'next',
        value: function next() {
            this.index += 1;
            if (this.index === this.slides.length) {
                this.$wrap.style.transform = 'translate(0)';
                this.index = 0;
            }

            var x = '-' + this.index * 100 / this.slides.length + '%';
            this.$wrap.style.transform = 'translate(' + x + ')';
        }
    }]);

    return Slider;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MusicPlayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lyrics_player = __webpack_require__(10);

var _progress_bar = __webpack_require__(11);

var _helpers = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MusicPlayer = exports.MusicPlayer = function () {
    function MusicPlayer(el) {
        _classCallCheck(this, MusicPlayer);

        this.$el = el;
        this.$el.addEventListener("click", this);

        this.$audio = this.createAudio();
        this.lyrics = new _lyrics_player.lyricsPlayer(this.$el.querySelector('.player-lyrics'), this.$audio);
        this.progress = new _progress_bar.ProgressBar(this.$el.querySelector(".progress"), 0, true); // new ProgressBar(el,duration,start)

        this.showPlayer();
    }

    _createClass(MusicPlayer, [{
        key: 'showPlayer',
        value: function showPlayer() {
            var that = this;

            this.showPlayerBtn = document.querySelector("#show-player");
            this.showPlayerBtn.addEventListener("click", function () {
                that.show();
            });
        }
    }, {
        key: 'createAudio',
        value: function createAudio() {
            var _this = this;

            var audio = document.createElement("audio");
            audio.addEventListener('ended', function () {
                _this.$audio.play();
                _this.lyrics.restart();
                _this.progress.restart();
                console.log('ended');
            });
            document.body.appendChild(audio);
            return audio;
        }
    }, {
        key: 'handleEvent',
        value: function handleEvent(event) {
            var target = event.target;
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
    }, {
        key: 'onPlay',
        value: function onPlay(event) {
            this.$audio.play();
            this.lyrics.start();
            this.progress.start();

            event.target.classList.add("icon-pause");
            event.target.classList.remove("icon-play");
        }
    }, {
        key: 'onPause',
        value: function onPause(event) {
            this.$audio.pause();
            this.lyrics.pause();
            this.progress.pause();

            event.target.classList.add("icon-play");
            event.target.classList.remove("icon-pause");
        }
    }, {
        key: 'show',
        value: function show() {
            this.$el.classList.add("show");
            document.body.classList.add("noscroll");
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.$el.classList.remove("show");
            document.body.classList.remove("noscroll");
        }
    }, {
        key: 'play',
        value: function play() {
            var _this2 = this;

            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if (!options) return;
            console.log(options);

            this.$el.querySelector('.song-name').innerText = decodeURIComponent(options.songname);
            this.$el.querySelector('.song-artist').innerText = decodeURIComponent(options.artist);
            this.progress.reset(options.duration);

            // let url = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${options.albummid}.jpg?max_age=2592000`;
            var url = (0, _helpers.albumCoverUrl)(options.albummid);
            this.$el.querySelector('.album-cover').src = url;
            this.$el.querySelector('.player-background').style.backgroundImage = 'url(' + url + ')';
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
                this.$audio.src = (0, _helpers.songUrl2)(this.songmid);

                // fetch(`https://qq-music-api.now.sh/lyrics?id=${this.songid}`)
                fetch((0, _helpers.lyricsUrl)(this.songid)).then(function (res) {
                    return res.json();
                }).then(function (json) {
                    return json.lyric;
                }).then(function (text) {
                    return _this2.lyrics.reset(text);
                }).catch(function () {});
            }
            this.show();
        }
    }]);

    return MusicPlayer;
}();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lyricsPlayer = exports.lyricsPlayer = function () {
    function lyricsPlayer(el, audio) {
        _classCallCheck(this, lyricsPlayer);

        this.$el = el;
        this.$el.innerHTML = "<div class=\"player-lyrics-lines\"></div>";
        this.$lines = this.$el.querySelector(".player-lyrics-lines");
        this.$audio = audio;
        this.text = '';
        this.index = 0;
        this.lyrics = [];
        this.elapsed = 0;

        this.reset(this.text);
    }

    _createClass(lyricsPlayer, [{
        key: "formatText",
        value: function formatText(text) {
            var div = document.createElement("div");
            div.innerHTML = text;
            return div.innerText;
        }
    }, {
        key: "render",
        value: function render() {
            var html = this.lyrics.map(function (line) {
                return "\n            <div class=\"player-lyrics-line\">" + line.slice(10) + "</div>\n        ";
            }).join("");
            this.$lines.innerHTML = html;
        }
    }, {
        key: "reset",
        value: function reset(text) {
            this.pause();
            this.index = 0;
            this.elapsed = 0;
            if (text) {
                this.text = this.formatText(text) || '';
                this.lyrics = this.text.match(/^\[\d{2}:\d{2}\.\d{2}\](.+)$/gm) || [];
                if (this.lyrics.length) {
                    this.render();
                    this.$lines.children[this.index].classList.add("active");
                }
            }
        }
    }, {
        key: "start",
        value: function start() {
            this.pause();
            this.intervalId = setInterval(this.update.bind(this), 1000);
        }
    }, {
        key: "pause",
        value: function pause() {
            clearInterval(this.intervalId);
        }
    }, {
        key: "update",
        value: function update() {
            this.elapsed = Math.floor(this.$audio.currentTime);
            if (this.index === this.lyrics.length - 1) return this.reset();

            for (var i = this.index + 1; i < this.lyrics.length; i++) {
                var seconds = this.getSeconds(this.lyrics[i]);

                if (this.elapsed === seconds && (!this.lyrics[i + 1] || this.elapsed < this.getSeconds(this.lyrics[i + 1]))) {
                    this.$lines.children[this.index].classList.remove("active");
                    this.$lines.children[i].classList.add("active");
                    this.index = i;
                    break;
                }
            }
            if (this.index > 2) {
                var y = -(this.index - 2) * this.LINE_HEIGHT;
                this.$lines.style.transform = "translateY(" + y + "px)";
            }
        }
    }, {
        key: "getSeconds",
        value: function getSeconds(line) {
            return +line.replace(/^\[(\d{2}):(\d{2}).*/, function (match, p1, p2) {
                return 60 * +p1 + +p2;
            });
        }
    }, {
        key: "formatText",
        value: function formatText(text) {
            var div = document.createElement("div");
            div.innerHTML = text;
            return div.innerHTML;
        }
    }, {
        key: "restart",
        value: function restart() {
            this.reset();
            this.start();
        }
    }]);

    return lyricsPlayer;
}();

lyricsPlayer.prototype.LINE_HEIGHT = 42;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgressBar = exports.ProgressBar = function () {
    function ProgressBar(el, duration, start) {
        _classCallCheck(this, ProgressBar);

        this.$el = el;

        this.elapsed = 0;
        this.duration = duration || 0;
        this.progress = 0;
        this.render();

        this.$progress = this.$el.querySelector('.progress-bar-progress');
        this.$elapsed = this.$el.querySelector('.progress-elapsed');
        this.$duration = this.$el.querySelector('.progress-duration');
        this.$elapsed.innerText = this.formatTime(this.elapsed);
        this.$duration.innerText = this.formatTime(this.duration);

        this.start();
    }

    _createClass(ProgressBar, [{
        key: 'start',
        value: function start() {
            this.intervalId = setInterval(this.update.bind(this), 50);
        }
    }, {
        key: 'pause',
        value: function pause() {
            clearInterval(this.intervalId);
        }
    }, {
        key: 'update',
        value: function update() {
            this.elapsed += 0.05;
            if (this.elapsed >= this.duration) this.reset();
            this.progress = this.elapsed / this.duration;
            this.$progress.style.transform = 'translate(' + (this.progress * 100 - 100) + '%)';
            this.$elapsed.innerText = this.formatTime(this.elapsed);
        }
    }, {
        key: 'restart',
        value: function restart() {
            this.reset();
            this.start();
        }
    }, {
        key: 'reset',
        value: function reset(duration) {
            this.pause();
            this.elapsed = 0;
            this.progress = 0;
            if (duration) {
                this.duration = +duration;
                this.$duration.innerText = this.formatTime(this.duration);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            this.$el.innerHTML = '<div class="progress-time progress-elapsed"></div>\n            <div class="progress-bar">\n                <div class="progress-bar-progress"></div>\n            </div>\n            <div class="progress-time progress-duration"></div>';
        }
    }, {
        key: 'formatTime',
        value: function formatTime(second) {
            var mins = Math.floor(second / 60);
            var secs = Math.floor(second % 60);
            if (mins < 10) mins = '0' + mins;
            if (secs < 10) secs = '0' + secs;
            return mins + ':' + secs;
        }
    }]);

    return ProgressBar;
}();

/***/ })
/******/ ]);