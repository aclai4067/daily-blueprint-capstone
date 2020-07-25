/* eslint-disable react/jsx-no-target-blank */
import './SingleToDo.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTag, faEdit } from '@fortawesome/free-solid-svg-icons';
import Moment from 'moment';

class SingleToDo extends React.Component {
  static propTypes = {
    setEditMode: PropTypes.func,
    teamView: PropTypes.bool,
  }

  launchEditModal = () => {
    const { toDo, setEditMode, launchToDoModal } = this.props;
    launchToDoModal();
    setEditMode(true, toDo);
  }

  completeToDo = (e) => {
    e.preventDefault();
  };

  render() {
    const { toDo, setFromPriority, teamView } = this.props;
    const dueDate = Moment(toDo.dateDue).format('MM/DD/YY');

    return (
      <div className='SingleToDo d-flex justify-content-between'>
        { setFromPriority ? [
          <form key={`toDoEntry-${toDo.id}`} className='col-sm-8'>
            <input className='col-1 completeCheck' type='checkbox' id={`completePriority-${toDo.priorityId}`} onChange={this.completeToDo} />
            <label className='col-11 text-left' htmlFor={`completeToDo-${toDo.priorityId}`}>
              {toDo.description}
              { toDo.link !== '' && <span> ({<a href={toDo.link} target='_blank'>Resource</a>})</span> }
              { toDo.taggedUsers[0] && <FontAwesomeIcon className='ml-2 taggedIcon' icon={faUserTag} /> }
            </label>
          </form>] : [<form key={`toDoEntry-${toDo.id}`} className='col-sm-9'>
            { teamView ? '' : <input className='col-1 completeCheck' type='checkbox' id={`completeToDo-${toDo.id}`} /> }
            <label className='col-11 text-left' htmlFor={`completeToDo-${toDo.id}`}>
            {toDo.description}
            { toDo.link !== '' && <span> ({<a href={toDo.link} target='_blank'>Resource</a>})</span> }
            { toDo.taggedUsers[0] && <FontAwesomeIcon className='ml-2 taggedIcon' icon={faUserTag} /> }
            </label>
          </form>]
        }
      <p className='text-right col-sm-3'>{dueDate}</p>
      { teamView ? '' : <button className='editButton btn close col-1' onClick={this.launchEditModal}><FontAwesomeIcon className='editIcon' icon={faEdit} /></button> }
      </div>
    );
  }
}

export default SingleToDo;
