import './MyNav.scss';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavbarToggler,
} from 'reactstrap';
import { Link } from 'react-router-dom';
// import firebase from 'firebase/app';
// import 'firebase/auth';
import PropTypes from 'prop-types';

class MyNav extends React.Component {
  state = {
    isOpen: false,
  }

  static propTypes = {
    authed: PropTypes.bool,
  }

  toggleNav = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logoutEvent = () => {
    console.log('to implement on auth ticket');
  }

  render() {
    const { isOpen } = this.state;
    const { authed } = this.props;

    const buildNavLinks = () => {
      if (authed) {
        return (
          <Nav className='navbar-nav ml-auto'>
            <NavItem>
              <Link className='nav-link' to='/'>Home</Link>
            </NavItem>
            <NavItem>
              <Link className='nav-link' to='/team'>Team</Link>
            </NavItem>
            <NavItem>
              <Link className='nav-link' to='/pomodoro'>Pomodoro Timer</Link>
            </NavItem>
            <NavItem>
              <button className='logout btn btn-outline-secondary ml-1 my-2 my-sm-0' onClick={this.logoutEvent}>Log Out</button>
            </NavItem>
          </Nav>
        );
      }
      return (
        <Nav className='navbar-nav ml-auto'></Nav>
      );
    };

    return (
      <div className='MyNav'>
        <Navbar className='navbar navbar-expand-lg navbar-light bg-light'>
          <NavbarBrand className='navBrand' href='/'>Daily Blueprint</NavbarBrand>
          { (authed) && (<NavbarToggler className='navTog' onClick={this.toggleNav} />) }
          <Collapse isOpen={isOpen} navbar>
              { buildNavLinks() }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNav;
