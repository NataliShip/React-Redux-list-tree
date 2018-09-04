import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import * as actions from "../../store/actions";
import Button from "../../components/elements/button";
import LayoutPage from "../../components/layouts/layout-page";
import LayoutContent from "../../components/layouts/layout-content";
import HeaderContainer from "../header-container";
import List from "../list";

class Home extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  };

  showInfo = () => {
    this.props.dispatch(actions.modal.open('info')).then(result => {
      console.log(result);
    });
  };

  render() {
    return (
      <LayoutPage header={<HeaderContainer/>}>
        <LayoutContent>
          <List></List>
          <Button onClick={this.showInfo}>Показать модалку</Button>
        </LayoutContent>
      </LayoutPage>
    );
  }
}

export default withRouter(
  connect(state => ({}))(Home)
);
