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
      organizationId: '',
    },
    organizations: [],
  }

  static propTypes = {
    modalIsOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
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
        tempUser.organizationId = Number(user.organizationId);
        if (user.imageUrl === '') {
          tempUser.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png';
        }
        this.setState({ user: tempUser });
        userData.createUser(this.state.user);
      }).catch((errorFromCreateUser) => console.error(errorFromCreateUser));
    toggleModal();
  }

  firstNameChange = (e) => {
    e.preventDefault();
    const tempUser = { ...this.state.user };
    tempUser.firstName = e.target.value;
    this.setState({ user: tempUser });
  }

  lastNameChange = (e) => {
    e.preventDefault();
    const tempUser = { ...this.state.user };
    tempUser.lastName = e.target.value;
    this.setState({ user: tempUser });
  }

  titleChange = (e) => {
    e.preventDefault();
    const tempUser = { ...this.state.user };
    tempUser.title = e.target.value;
    this.setState({ user: tempUser });
  }

  imageUrlChange = (e) => {
    e.preventDefault();
    const tempUser = { ...this.state.user };
    tempUser.imageUrl = e.target.value;
    this.setState({ user: tempUser });
  }

  organizationChange = (e) => {
    e.preventDefault();
    const tempUser = { ...this.state.user };
    tempUser.organizationId = e.target.value;
    this.setState({ user: tempUser });
  }

  render() {
    const { user } = this.state;
    const {
      modalIsOpen,
      toggleModal,
      organizations,
    } = this.props;

    const buildOrgOptions = organizations.map((org) => <option key={`org-${org.id}`} value={org.id}>{org.orgName}</option>);

    return (
      <div className='NewUserModal'>
        <Modal isOpen={modalIsOpen} toggle={toggleModal} className={'createUserModal'}>
          <ModalBody>
            <form className='newUserForm'>
              <div className='form-group'>
                <label htmlFor='firstNameInput'>First Name  <span>*Required</span></label>
                <input type='text' className='form-control' id='firstNameInput' value={user.firstName} onChange={this.firstNameChange} required />
              </div>
              <div className='form-group'>
                <label htmlFor='lastNameInput'>Last Name  <span>*Required</span></label>
                <input type='text' className='form-control' id='lastNameInput' value={user.lastName} onChange={this.lastNameChange} required />
              </div>
              <div className='form-group'>
                <label htmlFor='titleInput'>Title  <span>*Required</span></label>
                <input type='text' className='form-control' id='titleInput' value={user.title} onChange={this.titleChange} required />
              </div>
              <div className='form-group'>
                <label htmlFor='imageUrlInput'>Profile Photo Url</label>
                <input type='text' className='form-control' id='imageUrlInput' placeholder='' value={user.imageUrl} onChange={this.imageUrlChange} />
              </div>
              <div className="form-group">
                <label htmlFor="orgDropdown">Organization  <span>*Required</span></label>
                <select className="form-control" id="orgDropdown" value={user.organizationId} onChange={this.organizationChange} required>
                <option value='' disabled defaultValue>Select your option</option>
                  {buildOrgOptions}
                </select>
              </div>
              <ModalFooter className='d-flex justify-content-between'>
                <Button className='addUserBtn btn-secondary' onClick={this.createUserEvent}>Create Account &amp; Login with Google</Button>{' '}
                <Button className='dismissModal btn-secondary' onClick={toggleModal}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default NewUserModal;
