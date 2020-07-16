import './NewUserModal.scss';
import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';
import userData from '../../../helpers/data/userData';

class NewUserModal extends React.Component {
  state = {
    user: {
      firstName: '',
      lastName: '',
      title: '',
      imageUrl: '',
      firebaseUid: '',
      organizationId: 0,
    },
  }

  static propTypes = {
    modalIsOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    createUser: PropTypes.func,
  }

  createUserEvent = (e) => {
    e.preventDefault();
    const { toggleModal } = this.props;
    const { user } = this.state;
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((cred) => {
        const tempUser = { ...user };
        tempUser.firebaseUid = cred.user.uid;
        if (user.imageUrl === '') {
          tempUser.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png';
        }
        this.setState({ user: tempUser });
        userData.createUser(user);
      }).catch((errorFromCreateUser) => console.error(errorFromCreateUser));
    toggleModal();
  }

  render() {
    const {
      createUser,
      modalIsOpen,
      toggleModal,
    } = this.props;

    return (
      <div className='NewUserModal'>
        <Modal isOpen={modalIsOpen} toggle={toggleModal} className={'createUserModal'}>
          <ModalBody>
            <p className='verifyDelete'>Are you sure you want to delete your entry?</p>
            <p>This cannot be recovered.</p>
          </ModalBody>
          <ModalFooter className='d-flex justify-content-between'>
            <Button className='addUserBtn' onClick={createUser}>Create Account &amp; Login with Google</Button>{' '}
            <Button className='dismissModal' onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default NewUserModal;
