import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import * as actions from '../../store/actions';
import getAllDataFromApi from '../../utils/fakeAPI';
import itemsToTree from '../../utils/transformItemsToTree';
import generateRandomIds from '../../utils/generateRandomIds';

class List extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  };

  buildTree(list, parentId) {
    if (Array.isArray(list[parentId])) { //this is the recursive call of function
      return list[parentId].map(listItem => {
        return (
          <ul className='list__body' key={listItem._id}>
            <li className='list__item-title'>
              {listItem.title}
              {this.buildTree(list, listItem._id)}
            </li>
          </ul>
        );
      });
    }
  }

  render() {
    const ids =  generateRandomIds();
    const items = getAllDataFromApi(ids); // this function imitate requests to API to get item by id in random order
    const list = Array.isArray(items) ? itemsToTree(items) : [];
    return (
      <div className='list'>
        <h2 className='list__header'>Ненумерованный список (дерево) с функцией inline редактирования</h2>
        <div className='list__container'>
          {this.buildTree(list, 0)}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({}))(List)
);