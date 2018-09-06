import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import * as actions from '../../store/actions';
import itemsToTree from '../../utils/transformItemsToTree';

class List extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    items: PropTypes.array.isRequired,
  };

  constructor() {
    super();
    this.state = {
      list: [],
    };
  }

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

  componentDidMount() {
    this.props.dispatch(actions.list.getData());
  }

  render() {
    const list = Array.isArray(this.props.items) ? itemsToTree(this.props.items) : [];
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
  connect(state => ({
    items: state.list.items
  }))(List)
);