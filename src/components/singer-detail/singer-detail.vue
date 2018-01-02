<template>
  <transition name="slider">
    <music-list :bg-image="bgImage" :songs="songs" :title="title"></music-list>
  </transition>
</template>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable";
  .slider-enter,.slider-leave-to
    transform: translate3d(100%,0,0)
  .slider-enter-active, .slider-leave-active
    transition: all 0.3s

  .singer-detail
    position:fixed
    z-index: 999
    top:0
    bottom: 0
    left: 0
    right: 0
    background: $color-background
</style>
<script>
    import {mapGetters} from 'vuex';
    import {getSingerDetail} from '@/api/singer';
    import {ERR_OK} from '@/api/config'
    import {createSong} from '@/common/js/song'
    import musicList from '@/components/music-list/music-list'
    export default {
        data() {
            return {
              songs: []
            }
        },
      components: {
        musicList
      },
      computed: {
        title() {
          return this.singer.name
        },
        bgImage() {
          return this.singer.avatar
        },
        ...mapGetters([
          'singer'
        ])
      },
      created() {
        this._getDetail()
      },
      methods: {
        _getDetail() {
          if (!this.singer.id) {
            this.$router.push('/singer')
            return
          }
          getSingerDetail(this.singer.id).then(res => {
            if(res.code === ERR_OK){
              this.songs = this._normalizeSongs(res.data.list)
            }
          })
        },
        _normalizeSongs(list) {
          let ret = [];
          list.forEach(item => {
            let {musicData} = item;
            if(musicData.songid && musicData.albummid) {
              ret.push(createSong(musicData))
            }
          })
          return ret;
        }
      }
    }
</script>
