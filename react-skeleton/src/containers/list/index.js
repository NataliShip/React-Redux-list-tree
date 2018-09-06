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
    tree: PropTypes.array,
  };

  constructor() {
    super();
    this.state = {
      redacting: false,
    };
    this.redactItem = this.redactItem.bind(this);
    this.stopRedacting = this.stopRedacting.bind(this);
  }

  redactItem() {
    this.setState({redacting: true});
  }

  stopRedacting(id, e) {
    e.stopPropagation();
    this.setState({redacting: false});
    let newValue = e.target.value;
    let redactedElement = {};
    this.props.items.map(item => {
      if (item._id == id) {
        redactedElement = item;
        this.props.dispatch(actions.list.changeTitle(redactedElement, newValue));
      }
    });
  }

  buildTree(list, parentId) { //this is the recursive call of function
    if (Array.isArray(list[parentId])) {
      return list[parentId].map(listItem => {
        return (
          <ul className='list__body' key={listItem._id}>
            <li className='list__item' onClick={this.redactItem}>
              {!this.state.redacting
                ? <span className='list__item-title'>{listItem.title}</span>
                : <input
                  className='list__item-input'
                  type="text"
                  defaultValue={listItem.title}
                  onBlur={(event) => this.stopRedacting(listItem._id, event)}
                  onKeyUp={(event) => {
                    if(event.keyCode == 13) {
                      this.stopRedacting(listItem._id, event);
                    }}}
                />
              }

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