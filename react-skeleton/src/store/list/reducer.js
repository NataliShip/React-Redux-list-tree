import reducer from '../../utils/reducer';
import {types} from './actions.js';

const initState = {
  items: [],
  tree: [],
  change: {},
};

export default reducer(initState, {

  [types.GET_DATA_FROM_API]: (state, action) => {
    return {
      ...state,
      items: action.payload.data,
      tree: action.payload.tree,
    };
  },

  [types.CHANGE_TITLE]: (state, action) => {
    return {
      ...state,
      change: action.payload.element,
    };
  },
});