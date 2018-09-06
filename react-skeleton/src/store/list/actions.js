import {getItemFromApi} from "../../utils/fakeAPI";

export const types = {
  GET_DATA_FROM_API: 'GET_DATA_FROM_API',
  CHANGE_TITLE: 'CHANGE_TITLE',
};

export default {

  getData: () => {
    return dispatch => {
      let ids = [];
      for (let i = 1; i <= 10; i++) {
        ids.push(i);
      }
      for (let i = ids.length - 1; i > 0; i--) {  // generate array of numbers from 1 to 10 in a random order
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
      }
      let data = [];
      for (let i = 0; i < ids.length; i++) {
        data.push(getItemFromApi(ids[i])); // send requests to get all random data
      }

      function transformToTree (items) { // creates an array with nested fields
        if (Array.isArray(items)) {
          let tree = [];
          items.sort((prev, next) => {
            return prev._id - next._id;
          });
          items.map(item => {
            let key = item.parent;
            if (key == null) {
              key = 0;
            }
            tree[key] = items.filter(el => el.parent == item.parent);
          });
          return tree;
        };
      }

      let tree = transformToTree(data);

      dispatch({
        type: types.GET_DATA_FROM_API,
        payload: {data, tree}
      });
    };
  },

  changeTitle: (element, value) => {
    return dispatch => {
      element.title = value;
      dispatch({
        type: types.CHANGE_TITLE,
        payload: {element}
      });
    };
  }
};