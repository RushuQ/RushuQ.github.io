import {commonParams, options} from './config';
import axios from 'axios';
import jsonp from '@/common/js/jsonp';
export function getLyric(mid) {
  const url = '/api/lyric';
  const data = Object.assign({},commonParams,{
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })
  return axios.get(url,{
    params: data
  }).then(res => {
    return Promise.resolve(res.data);
  })
}

export function getSongKey(musicData) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';

  const data = Object.assign({},commonParams,{
    guid: 6335167350,
    filename: `C400${musicData.songmid}.m4a`,
    songmid: musicData.songmid,
    uin:0,
    cid:205361747,
    hostUin: 0,
    loginUin:0,
    g_tk:5381,
    needNewCode: 0,
    format:'json',
    platform:'yqq'
  })
  return jsonp(url,data,options)
}
