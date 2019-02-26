/**
 * 用于伪造请求
 */
const express = require("express");
const request = require("request-promise");
const app = express();
const cors = require("cors");
const port = process.env.port || 4000;

const HEADERS = {
    'accept': 'application/json',
    'authority': 'c.y.qq.com',
    'origin': 'http://m.y.qq.com',
    'referer': 'http://m.y.qq.com/',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
}

app.use(cors());

app.get("/",async (req,res) => {
    const url = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=${+ new Date()}&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1`;
    try {
        res.json(await request({
            url: url,
            json: true,
            headers: HEADERS
        }))        
    } catch (e) {
        console.log(e);
        res.json({error: e.message});
    }
})

app.get("/search",async(req,res) => {   // localhost:port/search?keyword=songname&page=number
    const {keyword,page = 1} = req.query;
    const url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?_=${+ new Date()}&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&${'p=' + page}&remoteplace=txt.mqq.all`;
    // const url = `httpis://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?_=${+ new Date()}&g_tk=621601616&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${decodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all`;
    try {
        res.json(await request({
            url: url,
            json: true,
            headers: HEADERS
        }))        
    } catch (e) {
        console.log(e);
        res.json({error: e.message});
    }

})

app.get("/lyrics",async (req,res) => {  // localhost:4000/lyrics?id=9103820
    const {id ,type} = req.query;
    // https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?g_tk=721195923&uin=524216297&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&nobase64=1&musicid=7016921&songtype=0&_=1550897243346&jsonpCallback=jsonp1
    // https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?nobase64=1&musicid=7016921&songtype=0
    const url = `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?nobase64=1&musicid=${id}&songtype=${type || 0}`;
    try {
        let text = (await request({
            url: url,
            headers: {
                'accept': '*/*',
                'authority': 'c.y.qq.com',
                'referer': 'http://c.y.qq.com/',
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',            
            }
        })).replace(/MusicJsonCallback\((.*)\)/, '$1')
        res.json(JSON.parse(text))
    } catch(e) {
        res.json({error: e.message})
    }
})

app.listen(port);


