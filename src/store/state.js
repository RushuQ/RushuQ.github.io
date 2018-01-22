import {playMode} from '@/common/js/config'
const state = {//状态管理
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {}
}

export default state
