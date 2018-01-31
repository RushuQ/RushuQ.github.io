import {playMode} from '@/common/js/config'
import {loadSearch,loadFavorite} from '@/common/js/cache'

const state = {//状态管理
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: [],
  favoriteList: loadFavorite()
}

export default state
