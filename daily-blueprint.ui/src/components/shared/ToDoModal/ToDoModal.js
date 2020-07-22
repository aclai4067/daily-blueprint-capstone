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
  }

  static propTypes = {
    toDoModalIsOpen: PropTypes.bool,
    fromPriority: PropTypes.bool,
    toggleToDoModal: PropTypes.func,
    updateToDos: PropTypes.func,
    userId: PropTypes.number,
    editMode: PropTypes.bool,
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
    if (this.props.fromPriority !== prevProps.fromPriority) {
      if (this.props.fromPriority === true) {
        if (this.props.editMode === true) {
          const { toEdit } = this.props;
        } else {
          const tempPriority = { ...this.state.priority };
          tempPriority.type = 'daily';
          this.setState({ priority: tempPriority });
        }
      }
    }
  }

  clearForm = () => {
    const { userId, setEditMode } = this.props;
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
                <Button className='addToDoBtn' onClick={this.createToDoEvent}>Save</Button>{' '}
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
