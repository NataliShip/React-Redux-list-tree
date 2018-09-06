import reducer from '../../utils/reducer';
import {types} from './actions.js';

const initState = {
  items: [],
};

export default reducer(initState, {

  [types.GET_DATA_FROM_API]: (state, action) => {
    return {
      ...state,
      items: action.payload.data,
    };
  },

  // [types.CLOSE]: (state, action) => {
  //   if (state.name) {
  //     return {
  //       ...state,
  //       show: false,
  //       result: action.payload.result,
  //       resolve: null
  //     };
  //   } else {
  //     return state;
  //   }
  // }
});