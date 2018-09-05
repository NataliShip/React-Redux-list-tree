import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import * as actions from '../../store/actions';
import getItemFromApi from '../../utils/fakeAPI';

class List extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  };

  constructor() {
    super();
    this.buildTree = this.buildTree.bind(this);
  }

  generateRandomIds() { // this function generate array of numbers from 1 to 10 in a random order
    let ids = [];
    for (let i = 1; i <= 10; i++) {
      ids.push(i);
    }
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    return ids;
  }

  getAllDataFromApi(ids) {
    let data = [];
    for (let i = 0; i < ids.length; i++) {
      data.push(getItemFromApi(ids[i]));
    }
    return data;
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
    const ids =  this.generateRandomIds();
    const items = this.getAllDataFromApi(ids); // this function imitate request to API to get item by id in random order
    const list = Array.isArray(items) ? this.itemsToList(items) : [];
    return (
      <div>
        <div>
          <h2>Ненумерованный список (дерево) с функцией inline редактирования</h2>
          {this.buildTree(list, 0)}
        </div>
        {console.log(items)}
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({}))(List)
);