import * as type from './mutation-type';
import {playMode} from '@/common/js/config';
import {shuffe} from "../common/js/util";

function findIndex(list,song) {
  return list.findIndex(item => {
    return item.id === song.id;
  })
}
export const selectPlay = function ({commit,state},{list,index}) {
  commit(type.SET_SEQUENCE_LIST, list);
  if(state.mode === playMode.random){
    const randomList = shuffe(list);
    commit(type.SET_PLAYLIST,randomList);
    index = findIndex(randomList,list[index]);
    console.log(index);
  } else {
    commit(type.SET_PLAYLIST, list);
  }
  commit(type.SET_CURRENT_INDEX, index);
  commit(type.SET_FULL_SCREEN, true)
  commit(type.SET_PLAYING_STATE,true);
}

export const randomPlay = function ({commit},{list}) {
    commit(type.SET_PLAY_MODE,playMode.random);
    commit(type.SET_PLAYLIST,list);
    const randomList = shuffe(list);
  commit(type.SET_SEQUENCE_LIST,randomList);
  commit(type.SET_CURRENT_INDEX,0);
  commit(type.SET_FULL_SCREEN, true)
  commit(type.SET_PLAYING_STATE,true);
}
export const insertSong = function ({commit,state},song) {
  let playlist = state.playlist.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  let currentSong = playlist[currentIndex];

  let fpIndex = findIndex(playlist,song);
  currentIndex++;
  playlist.splice(currentIndex,0,song);
  if(fpIndex > -1){
    if(currentIndex > fpIndex) {
      playlist.splice(currentIndex,1)
      currentIndex--;
    } else {
      playlist.splice(fpIndex + 1,1)
    }
  }
  let currentSIndex = findIndex(sequenceList,currentSong) +1;
  let fsIndex = findIndex(sequenceList,song);
  sequenceList.splice(currentIndex,0,song);
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
