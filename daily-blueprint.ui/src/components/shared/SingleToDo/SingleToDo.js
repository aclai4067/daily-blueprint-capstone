/* eslint-disable react/jsx-no-target-blank */
import './SingleToDo.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTag, faEdit, faTags } from '@fortawesome/free-solid-svg-icons';
import Moment from 'moment';
import toDoData from '../../../helpers/data/toDoData';

class SingleToDo extends React.Component {
  static propTypes = {
    setEditMode: PropTypes.func,
    teamView: PropTypes.bool,
    fromPriority: PropTypes.bool,
    updateToDos: PropTypes.func,
    userId: PropTypes.number,
  }

  launchEditModal = () => {
    const { toDo, setEditMode, launchToDoModal } = this.props;
    launchToDoModal();
    setEditMode(true, toDo);
  }

  launchTagUserModal = () => {
    const { toDo, setToTag, launchTagModal } = this.props;
    launchTagModal();
    setToTag(toDo);
  }

  completeToDo = () => {
    const {
      fromPriority,
      toDo,
      updateToDos,
      userId,
    } = this.props;
    if (fromPriority) {
      toDoData.completeToDo(toDo.toDoId)
        .then(() => updateToDos(userId))
        .catch((errorMarkingPriorityComplete) => console.error(errorMarkingPriorityComplete));
    } else {
      toDoData.completeToDo(toDo.id)
        .then(() => updateToDos(userId))
        .catch((errorMarkingToDoComplete) => console.error(errorMarkingToDoComplete));
    }
  };

  render() {
    const { toDo, fromPriority, teamView } = this.props;
    const dueDate = Moment(toDo.dateDue).format('MM/DD/YY');

    return (
      <div className='SingleToDo d-flex justify-content-between'>
        { fromPriority ? [
          <form key={`toDoEntry-${toDo.id}`} className='col-sm-8'>
            { teamView ? '' : <input className='col-1 completeCheck' type='checkbox' id={`completePriority-${toDo.priorityId}`} onChange={this.completeToDo} /> }
            <label className='col-11 text-left' htmlFor={`completeToDo-${toDo.priorityId}`}>
              {toDo.description}
              { toDo.link !== '' && <span> ({<a href={toDo.link} target='_blank'>Resource</a>})</span> }
              { toDo.taggedUsers[0] && <FontAwesomeIcon className='ml-2 taggedIcon' icon={faUserTag} /> }
            </label>
          </form>] : [<form key={`toDoEntry-${toDo.id}`} className='col-sm-8'>
            <input className='col-1 completeCheck' type='checkbox' id={`completeToDo-${toDo.id}`} onChange={this.completeToDo} />
            <label className='col-11 text-left' htmlFor={`completeToDo-${toDo.id}`}>
            {toDo.description}
            { toDo.link !== '' && <span> ({<a href={toDo.link} target='_blank'>Resource</a>})</span> }
            { toDo.taggedUsers[0] && <FontAwesomeIcon className='ml-2 taggedIcon' icon={faUserTag} /> }
            </label>
          </form>]
        }
      <p className='text-right col-sm-2'>{dueDate}</p>
      { teamView ? '' : <div className='d-flex flex-wrap col-2'><button className='editButton btn close col-6' onClick={this.launchEditModal}><FontAwesomeIcon className='editIcon' icon={faEdit} /></button>
      <button className='tagButton btn close col-6' onClick={this.launchTagUserModal}><FontAwesomeIcon className='tagIcon' icon={faTags} /></button></div> }
      </div>
    );
  }
}

export default SingleToDo;
