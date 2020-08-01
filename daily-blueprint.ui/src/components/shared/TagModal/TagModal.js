import './TagModal.scss';
import React from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';
import userData from '../../../helpers/data/userData';
import toDoData from '../../../helpers/data/toDoData';
import UserShape from '../../../helpers/propz/UserShape';

class TagModal extends React.Component {
  state = {
    tagged: [],
    unassignedUsers: [],
    toDoId: 0,
    userToAdd: '',
  }

  static propTypes = {
    tagModalIsOpen: PropTypes.bool,
    toggleTagModal: PropTypes.func,
    owner: UserShape.userShape,
    updateToDos: PropTypes.func,
  }

  componentDidUpdate(prevProps) {
    if (this.props.tagModalIsOpen && this.props.tagModalIsOpen !== prevProps.tagModalIsOpen) {
      const { owner, toTag, fromPriority } = this.props;
      if (fromPriority) {
        this.setState({ toDoId: toTag.toDoId });
      } else {
        this.setState({ toDoId: toTag.id });
      }
      const currentTagged = toTag.taggedUsers;
      this.setState({ tagged: currentTagged });
      this.getAllUsers(owner.organizationId);
    }
  }

  getAllUsers = (orgId) => {
    userData.getAllUsersByOrg(orgId)
      .then((results) => {
        const allUsers = results.data;
        const currentTagged = this.state.tagged;
        const unassigned = [];
        allUsers.forEach((u) => {
          const taggedUser = currentTagged.find((t) => t.id === u.id);
          if (taggedUser === undefined) {
            unassigned.push(u);
          }
        });
        this.setState({ unassignedUsers: unassigned });
      }).catch((errorFromGetAllUsers) => console.error(errorFromGetAllUsers));
  }

  updateTagged = (toDoId) => {
    toDoData.getTagsByToDo(toDoId)
      .then((results) => this.setState({ tagged: results.data }))
      .catch(() => this.setState({ tagged: [] }));
  }

  addTag = (e) => {
    e.preventDefault();
    const { userToAdd, toDoId } = this.state;
    const { owner, updateToDos } = this.props;
    const newTag = {
      userId: Number(userToAdd),
      toDoId,
    };
    toDoData.createTag(newTag)
      .then(() => {
        updateToDos(owner.id);
        this.setState({ userToAdd: '' });
        this.updateTagged(toDoId);
        this.getAllUsers(owner.organizationId);
      }).catch((errorFromAddTag) => console.error(errorFromAddTag));
  }

  deleteTag = (e) => {
    e.preventDefault();
    const { toDoId } = this.state;
    const { updateToDos, owner } = this.props;
    const tagToRemove = Number(e.target.value);
    toDoData.removeTag(tagToRemove)
      .then(() => {
        updateToDos(owner.id);
        this.setState({ userToAdd: '' });
        this.updateTagged(toDoId);
        this.getAllUsers(owner.organizationId);
      }).catch((errorFromDeleteTag) => console.error(errorFromDeleteTag));
  }

  dismissTagModal = (e) => {
    e.preventDefault();
    const { toggleTagModal } = this.props;
    this.setState({ userToAdd: '' });
    toggleTagModal();
  }

  userToAddChange = (e) => {
    e.preventDefault();
    const userId = e.target.value;
    this.setState({ userToAdd: userId });
  }

  buildTaggedList = () => this.state.tagged.map((t) => <div key={`tagged-${t.tagId}`} className='col-sm-4 d-flex'><p>{`${t.firstName} ${t.lastName}`}</p>
      <button className='btn close' value={t.tagId} onClick={this.deleteTag}>X</button></div>);

  buildStaffDropdown = () => this.state.unassignedUsers.map((u) => <option key={`tagStaff-${u.id}`} value={u.id}>{`${u.firstName} ${u.lastName}`}</option>);

  render() {
    const { userToAdd } = this.state;
    const {
      tagModalIsOpen,
      toggleTagModal,
    } = this.props;

    return (
      <div className='TagModal'>
        <Modal isOpen={tagModalIsOpen} toggle={toggleTagModal} className={'editTagModal'}>
          <ModalBody>
            <div>
              <form className='unassignedUsers d-flex flex-wrap'>
                <h5>Tag Others</h5>
                <select className='form-control' id='tagUserInput' value={userToAdd} onChange={this.userToAddChange}>
                  <option value='' disabled defaultValue>Select A Coworker To Tag</option>
                  {this.buildStaffDropdown()}
                </select>
                <div>
                  <button className='btn btn-secondary' onClick={this.addTag}>Add</button>
                </div>
              </form>
              <div className='taggedUsers d-flex flex-wrap'>
                <h5>Tagged</h5>
                {this.buildTaggedList()}
              </div>
              <Button className='dismissModal' onClick={this.dismissTagModal}>Done</Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default TagModal;
