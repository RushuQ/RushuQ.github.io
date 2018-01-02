import * as types from './mutation-type';

const matutions = {
  [types.SET_SINGER](state,singer){
    state.singer = singer;
  }
}

export default matutions
