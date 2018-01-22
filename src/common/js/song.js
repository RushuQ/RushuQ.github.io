import {getLyric,getSongKey} from "@/api/song";
import  {ERR_OK} from "@/api/config";
import {Base64} from 'js-base64'
export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric() {
    if(this.lyric) {
      return Promise.resolve(this.lyric);
    }
    return new Promise((resolve,reject) => {
      getLyric(this.mid).then(res => {
        if(res.retcode === ERR_OK){
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric);
        } else {
          reject('no lyric');
        }
      })
    })

  }
}
export function createSong(musicData) {
  //let key = getSongKey(musicData)
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=9D4744FD0C5ED6A8F2FBFD0CE69F42735D67108A115798537A71B2E53E66CDD735722730BE7EB39B1F4776D74FAFFE612264088A7F285138&guid=6335167350&uin=864221359&fromtag=66`
  })
}
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
