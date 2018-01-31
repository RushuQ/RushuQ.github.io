import * as type from './mutation-type';
import {playMode} from '@/common/js/config';
import {shuffe} from "../common/js/util";
import {saveSearch, deleteSearch, clearSearch,savePlay, saveFavorite, deleteFavorite} from '@/common/js/cache'

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id;
  })
}

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(type.SET_SEQUENCE_LIST, list);
  if (state.mode === playMode.random) {
    const randomList = shuffe(list);
    commit(type.SET_PLAYLIST, randomList);
    index = findIndex(randomList, list[index]);
    console.log(index);
  } else {
    commit(type.SET_PLAYLIST, list);
  }
  commit(type.SET_CURRENT_INDEX, index);
  commit(type.SET_FULL_SCREEN, true)
  commit(type.SET_PLAYING_STATE, true);
}

export const randomPlay = function ({commit}, {list}) {
  commit(type.SET_PLAY_MODE, playMode.random);
  commit(type.SET_PLAYLIST, list);
  const randomList = shuffe(list);
  commit(type.SET_SEQUENCE_LIST, randomList);
  commit(type.SET_CURRENT_INDEX, 0);
  commit(type.SET_FULL_SCREEN, true)
  commit(type.SET_PLAYING_STATE, true);
}
export const insertSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  let currentSong = playlist[currentIndex];

  let fpIndex = findIndex(playlist, song);
  currentIndex++;
  playlist.splice(currentIndex, 0, song);
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playlist.splice(currentIndex, 1)
      currentIndex--;
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }
  let currentSIndex = findIndex(sequenceList, currentSong) + 1;
  let fsIndex = findIndex(sequenceList, song);
  sequenceList.splice(currentIndex, 0, song);
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  commit(type.SET_PLAYLIST, playlist)
  commit(type.SET_SEQUENCE_LIST, sequenceList)
  commit(type.SET_CURRENT_INDEX, currentIndex)
  commit(type.SET_FULL_SCREEN, true)
  commit(type.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(type.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(type.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
  commit(type.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  let pIndex = findIndex(playlist, song);
  playlist.splice(pIndex, 1);
  let sIndex = findIndex(sequenceList, song);
  sequenceList.splice(sIndex, 1);
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }
  commit(type.SET_SEQUENCE_LIST, sequenceList);
  commit(type.SET_PLAYLIST, playlist);
  commit(type.SET_CURRENT_INDEX, currentIndex);
  const playState = playlist.length > 0 ? true : false;
  commit(type.SET_PLAY_MODE, playState);
}

export const deleteSongList = function ({commit}) {
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_PLAYING_STATE, false)
}

export const savePlayHistory = function ({commit}, song) {
  commit(type.SET_PLAY_HISTORY, savePlay(song))
}

export const saveFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}
