import './Login.scss';
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStopwatch,
  faUserTag,
  faUsers,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';
import googleLogo from './googCircleIcon.png';
import NewUserModal from '../../shared/NewUserModal/NewUserModal';
import orgData from '../../../helpers/data/orgData';

class Login extends React.Component {
  state = {
    modalIsOpen: false,
    organizations: [],
  }

  componentDidMount() {
    orgData.getAllOrgs()
      .then((results) => this.setState({ organizations: results.data }))
      .catch((errorGettingOrgs) => console.error(errorGettingOrgs));
  }

  loginEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  toggleModal = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  render() {
    const { modalIsOpen, organizations } = this.state;

    return (
      <div className='Login'>
        <h1>Welcome to Daily Blueprint</h1>
        <div className='features d-flex flex-wrap mt-sm-5'>
          <div className='singleFeature col-md-3 offset-md-2 col-xs-6 offset-xs-3 col-10 offset-1 mt-md-5 mt-3 d-flex justify-content-between'>
            <FontAwesomeIcon className='listIcon mr-3 featureIcon' icon={faClipboardList} />
            <p className='text-right'>Create Your To-Do List</p>
          </div>
          <div className='singleFeature col-md-3 offset-md-2 col-xs-6 offset-xs-3 col-10 offset-1 mt-md-5 mt-3 d-flex justify-content-between'>
            <FontAwesomeIcon className='listIcon mr-2 featureIcon' icon={faUserTag} />
            <p className='text-right'>Tag Collaborators</p>
          </div>
          <div className='singleFeature col-md-3 offset-md-2 col-xs-6 offset-xs-3 col-10 offset-1 mt-md-5 mt-3 d-flex justify-content-between'>
            <FontAwesomeIcon className='listIcon mr-2 featureIcon' icon={faUsers} />
            <p className='text-right'>Share Priorities With Your Team</p>
          </div>
          <div className='singleFeature col-md-3 offset-md-2 col-xs-6 offset-xs-3 col-10 offset-1 mt-md-5 mt-3 d-flex justify-content-between'>
            <FontAwesomeIcon className='listIcon mr-2 featureIcon' icon={faStopwatch} />
            <p className='text-right'>Manage Your Focus Time</p>
          </div>
        </div>
        <div className='btnContainer mt-md-5 mt-3'>
          <button className='btn btn-light' onClick={this.toggleModal}>Create A New Account</button>
          <button className='btn btn-light' onClick={this.loginEvent}><img src={googleLogo} className='googleIcon mr-2' alt='google icon' />Sign in with Google</button>
        </div>
        <NewUserModal modalIsOpen={modalIsOpen} toggleModal={this.toggleModal} createUser={this.createUserEvent} organizations={organizations} />
      </div>
    );
  }
}

export default Login;
