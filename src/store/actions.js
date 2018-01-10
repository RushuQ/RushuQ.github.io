import * as type from './mutation-type';
import {playMode} from '@/common/js/config';
import {shuffe} from "../common/js/util";

export const selectPlay = function ({commit,state},{list,index}) {
  commit(type.SET_SEQUENCE_LIST, list);
  commit(type.SET_PLAYLIST, list);
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
