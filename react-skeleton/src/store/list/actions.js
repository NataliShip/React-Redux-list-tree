import {getItemFromApi} from "../../utils/fakeAPI";

export const types = {
  GET_DATA_FROM_API: Symbol('GET_DATA_FROM_API'),
  CLOSE: Symbol('CLOSE'),
};

export default {

  getData: () => {
    let ids = []; // generate array of numbers from 1 to 10 in a random order
    for (let i = 1; i <= 10; i++) {
      ids.push(i);
    }
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }

    let data = [];
    for (let i = 0; i < ids.length; i++) {
      data.push(getItemFromApi(ids[i])); // send requests to get all random data
    }
    return dispatch => {
      dispatch({
        type: types.GET_DATA_FROM_API,
        payload: {data}
      });
    };
  },

  // close: (result) => {
  //   return async (dispatch, getState) => {
  //     const {modal} = getState();
  //     modal.resolve(result);
  //     dispatch({
  //       type: types.CLOSE,
  //       payload: {result}
  //     });
  //   };
  // }
};