import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import * as actions from "../../store/actions";

class List extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  };

  render() {
    return (
      <h2>Ненумерованный список (дерево) с функцией inline редактирования</h2>
    );
  }
}

export default withRouter(
  connect(state => ({}))(List)
);