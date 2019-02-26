import { LYRICS_URL, SEARCH_URL } from './constants.js'

export function lyricsUrl(songid) {
    return `${LYRICS_URL}?id=${songid}`;
}
export function songUrl(id) {
    return `http://dl.stream.qqmusic.qq.com/C400${id}.m4a?guid=4861199277&vkey=D1DE18BD76B603836D4BA91B100F9376E7DDAB9CC0BD21C3E569525CC4C7E8715F9901974A78D174BA2FCE9DFCA0DA92D3DCED779F49E4DD`;
}
export function albumCoverUrl(id) {
    return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${id}.jpg?max_age=2592000`;
}
export function songUrl2(mid) {
    return `http://dl.stream.qqmusic.qq.com/C400${mid}.m4a?guid=4861199277&vkey=C706F969497406E19A3B52295A377CE5802BB0E8FB9482FE35BAB5A46C9CAD881BF0B50A75067E94590228BE9A909B05CCD0EA3763BFADAE`;
}

export function searchUrl(keyword,page = 1) {
    return `${SEARCH_URL}?keyword=${keyword}&page=${page}`
}


 