import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import * as actions from '../../store/actions';
import getDataFromApi from '../../utils/fakeAPI';

class List extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  };

  constructor() {
    super();
    this.buildTree = this.buildTree.bind(this);
  }

  itemsToList(items) {
    let list = [];
    items.sort((prev, next) => {
      return prev._id - next._id;
    });
    items.map(item => {
      let key = item.parent;
      if (key == null) {
        key = 0;
      }
      list[key] = items.filter(el => el.parent == item.parent);
    });
    return list;
  }

  buildTree(list, parentId) {
    if (Array.isArray(list[parentId])) {
      return list[parentId].map(listItem => {
        return (
          <ul key={listItem._id}>
            <li>
              {listItem.title}
              {this.buildTree(list, listItem._id)}
            </li>
          </ul>
        );
      });
    }
  }

  render() {
    const items = getDataFromApi();
    const list = this.itemsToList(items);
    return (
      <div>
        <h2>Ненумерованный список (дерево) с функцией inline редактирования</h2>
        {console.log(list)}
        <ul>
          {this.buildTree(list, 0)}
        </ul>
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({}))(List)
);