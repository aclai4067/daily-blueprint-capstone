import './ToDoModal.scss';
import React from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import Moment from 'moment';
import PropTypes from 'prop-types';
import toDoData from '../../../helpers/data/toDoData';

class ToDoModal extends React.Component {
  state = {
    toDo: {
      description: '',
      dateCreated: '',
      dateDue: '',
      ownerUserId: '',
      isComplete: false,
      link: '',
    },
    priority: {
      toDoId: '',
      type: '',
      priorityDate: '',
    },
    priorityId: 0,
    tdId: 0,
  }

  static propTypes = {
    toDoModalIsOpen: PropTypes.bool,
    fromPriority: PropTypes.bool,
    toggleToDoModal: PropTypes.func,
    updateToDos: PropTypes.func,
    userId: PropTypes.number,
    editMode: PropTypes.bool,
    tempPriority: PropTypes.func,
  }

  componentDidMount() {
    const { userId } = this.props;
    const { toDo } = this.state;
    const currentDate = Moment().format();
    const tempToDo = { ...toDo };
    tempToDo.dateCreated = currentDate;
    tempToDo.ownerUserId = userId;
    this.setState({ toDo: tempToDo });
  }

  componentDidUpdate(prevProps) {
    if (this.props.fromPriority !== prevProps.fromPriority || this.props.editMode !== prevProps.editMode) {
      if (this.props.fromPriority === true) {
        if (this.props.editMode === true) {
          const { toEdit } = this.props;
          this.setPriorityEdit(toEdit);
          this.setToDoEdit(toEdit);
          this.setState({ priorityId: toEdit.priorityId });
        } else {
          const tempPriority = { ...this.state.priority };
          tempPriority.type = 'daily';
          this.setState({ priority: tempPriority });
        }
      } else if (this.props.fromPriority === false && this.props.editMode === true) {
        const { toEdit } = this.props;
        this.setToDoEdit(toEdit);
        this.setState({ tdId: toEdit.id });
      }
    }
  }

  setToDoEdit = (toEdit) => {
    const tempToDo = { ...this.state.toDo };
    tempToDo.description = toEdit.description;
    tempToDo.dateCreated = toEdit.dateCreated;
    tempToDo.dateDue = toEdit.dateDue;
    tempToDo.ownerUserId = toEdit.ownerUserId;
    tempToDo.isComplete = toEdit.isComplete;
    tempToDo.link = toEdit.link;
    this.setState({ toDo: tempToDo });
  }

  setPriorityEdit = (toEdit) => {
    const tempPriority = { ...this.state.priority };
    tempPriority.toDoId = toEdit.toDoId;
    tempPriority.type = toEdit.type;
    tempPriority.priorityDate = toEdit.priorityDate;
    this.setState({ priority: tempPriority });
  }

  clearForm = () => {
    const { userId, setEditMode, setFromPriority } = this.props;
    const currentDate = Moment().format();
    const clearToDo = {
      description: '',
      dateCreated: currentDate,
      dateDue: '',
      ownerUserId: userId,
      isComplete: false,
      link: '',
    };
    const clearPriority = {
      toDoId: '',
      type: '',
      priorityDate: '',
    };
    this.setState({ toDo: clearToDo, priority: clearPriority });
    setEditMode(false, {});
    setFromPriority(false);
  }

  resetOnSubmit = (userId) => {
    const { toggleToDoModal, updateToDos } = this.props;
    this.clearForm();
    updateToDos(userId);
    toggleToDoModal();
  }

  resetOnDismiss = () => {
    const { toggleToDoModal } = this.props;
    this.clearForm();
    toggleToDoModal();
  }

  createToDoEvent = (e) => {
    e.preventDefault();
    const { userId } = this.props;
    const { toDo, priority } = this.state;
    const currentDate = Moment().format();
    toDoData.createToDo(toDo)
      .then((result) => {
        if (priority.type !== '') {
          const tempPriority = { ...priority };
          tempPriority.toDoId = result.data.id;
          tempPriority.priorityDate = currentDate;
          this.setState({ priority: tempPriority });
          toDoData.createPriority(this.state.priority)
            .then(() => this.resetOnSubmit(userId));
        } else {
          this.resetOnSubmit(userId);
        }
      }).catch((errorFromCreateToDo) => console.error(errorFromCreateToDo));
  }

  updateToDoEvent = (e) => {
    e.preventDefault();
    const { fromPriority, userId } = this.props;
    const {
      toDo,
      priority,
      priorityId,
      tdId,
    } = this.state;
    const currentDate = Moment().format();
    if (fromPriority) {
      const priorityDetails = { ...toDo };
      priorityDetails.toDoId = priority.toDoId;
      priorityDetails.priorityDate = priority.priorityDate;
      priorityDetails.type = priority.type;
      priorityDetails.priorityId = priorityId;
      toDoData.updatePriority(priorityDetails)
        .then(() => this.resetOnSubmit(userId))
        .catch((errorFromUpdatePriority) => console.error(errorFromUpdatePriority));
    } else {
      const tempToDo = { ... toDo };
      tempToDo.id = tdId;
      toDoData.updateToDo(tempToDo)
        .then(() => {
          if (priority.type === 'daily' || priority.type === 'weekly') {
            const tempPriority = { ...priority };
            tempPriority.toDoId = tdId;
            tempPriority.priorityDate = currentDate;
            this.setState({ priority: tempPriority });
            toDoData.createPriority(this.state.priority)
              .then(() => this.resetOnSubmit(userId));
          } else {
            this.resetOnSubmit(userId);
          }
        }).catch((errorFromUpdateToDo) => console.error(errorFromUpdateToDo));
    }
  }

  descriptionChange = (e) => {
    e.preventDefault();
    const tempToDo = { ...this.state.toDo };
    tempToDo.description = e.target.value;
    this.setState({ toDo: tempToDo });
  }

  dateDueChange = (e) => {
    e.preventDefault();
    const tempToDo = { ...this.state.toDo };
    tempToDo.dateDue = e.target.value;
    this.setState({ toDo: tempToDo });
  }

  isCompleteChange = (e) => {
    const tempToDo = { ...this.state.toDo };
    tempToDo.isComplete = e.target.checked;
    this.setState({ toDo: tempToDo });
  }

  linkChange = (e) => {
    e.preventDefault();
    const tempToDo = { ...this.state.toDo };
    tempToDo.link = e.target.value;
    this.setState({ toDo: tempToDo });
  }

  typeChange = (e) => {
    e.preventDefault();
    const tempPriority = { ...this.state.priority };
    tempPriority.type = e.target.value;
    this.setState({ priority: tempPriority });
  }

  render() {
    const { toDo, priority } = this.state;
    const {
      toDoModalIsOpen,
      toggleToDoModal,
      editMode,
    } = this.props;

    return (
      <div className='ToDoModal'>
        <Modal isOpen={toDoModalIsOpen} toggle={toggleToDoModal} className={'createToDoModal'}>
          <ModalBody>
            <form className='toDoForm'>
              <div className='form-group'>
                <label htmlFor='descriptionInput'>Description  <span>*Required</span></label>
                <input type='text' className='form-control' id='descriptionInput' value={toDo.description} onChange={this.descriptionChange} required />
              </div>
              <div className='form-group'>
                <label htmlFor='linkInput'>Related Link</label>
                <input type='text' className='form-control' id='linkInput' value={toDo.link} onChange={this.linkChange} />
              </div>
              <div className='form-group'>
                <label htmlFor='dateDueInput'>Due Date  <span>*Required</span></label>
                <input type='date' className='form-control' id='dateDueInput' value={toDo.dateDue} onChange={this.dateDueChange} required />
              </div>
              <div className='form-group'>
                <label htmlFor='priorityTypeInput'>Is This a Priority?</label>
                <select className='form-control' id='priorityTypeInput' value={priority.type} onChange={this.typeChange}>
                  <option value='' defaultValue>Not a Priority</option>
                  <option value='daily'>Priority - Address Within The Next Day</option>
                  <option value='weekly'>Priority - Address Within The Next Week</option>
                </select>
              </div>
              <div className='form-group'>
                <input type='checkbox' className='completedCheckbox' data-val='true' id='isCompleteInput' checked={toDo.isComplete} onChange={this.isCompleteChange} />
                <label htmlFor='isCompleteInput'className='ml-1'>Completed</label>
              </div>
              <div className='d-flex justify-content-between'>
                { editMode ? <Button className='UpdateToDoBtn' onClick={this.updateToDoEvent}>Update</Button> : <Button className='addToDoBtn' onClick={this.createToDoEvent}>Save</Button> }
                <Button className='dismissModal' onClick={this.resetOnDismiss}>Cancel</Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ToDoModal;
