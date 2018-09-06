import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import * as actions from '../../store/actions';

class List extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    items: PropTypes.array.isRequired,
    tree: PropTypes.array.isRequired,
  };

  constructor() {
    super();
    this.state = {
      redacting: false,
    };
    this.redactItem = this.redactItem.bind(this);
  }
  redactItem(id, e) {
    e.stopPropagation();
    this.setState({redacting: true});
    let redactedElement = {};
    this.props.items.map(item => {
      if (item._id == id) {
        redactedElement = item;
        console.log(redactedElement);
        this.props.dispatch(actions.list.changeTitle(redactedElement));
      }
    });
  }

  buildTree(list, parentId) {
    if (Array.isArray(list[parentId])) { //this is the recursive call of function
      return list[parentId].map(listItem => {
        return (
          <ul className='list__body' key={listItem._id}>
            <li className='list__item-title' onClick={(event) => this.redactItem(listItem._id, event)}>
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
    return (
      <div className='list'>
        {/*{console.log(this.props.items)}*/}
        <h2 className='list__header'>Ненумерованный список (дерево) с функцией inline редактирования</h2>
        <div className='list__container'>
          {this.buildTree(this.props.tree, 0)}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({
    items: state.list.items,
    tree: state.list.tree,
  }))(List)
);