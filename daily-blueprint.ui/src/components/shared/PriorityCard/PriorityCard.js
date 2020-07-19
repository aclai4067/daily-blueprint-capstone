/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-target-blank */
import './PriorityCard.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTag } from '@fortawesome/free-solid-svg-icons';
import PriorityShape from '../../../helpers/propz/PriorityShape';

class PriorityCard extends React.Component {
  static propTypes = {
    priorities: PropTypes.arrayOf(PriorityShape.priorityShape),
    toggleToDoModal: PropTypes.func,
  }

  render() {
    const { priorities, toggleToDoModal, setFromPriority } = this.props;

    const launchToDoModal = () => {
      setFromPriority(true);
      toggleToDoModal();
    };

    const buildDailyPriorities = priorities.map((p) => p.type === 'daily' && <div key={`priority-${p.priorityId}`} className='d-flex justify-content-between' >
        <form className='col-sm-9'>
          <input className='col-1 completeCheck' type='checkbox' />
          <label className='col-11 text-left' htmlFor={`check-p-${p.priorityId}`}>
            {p.description}
            { p.link !== '' && <span>({<a href={p.link} target='_blank'>Resource</a>})</span> }
            { p.taggedUsers[0] && <FontAwesomeIcon className='ml-2 teaggedIcon' icon={faUserTag} /> }
          </label>
        </form>
        <p className='text-right col-sm-3'>{p.dateDue}</p>
      </div>);

    const buildWeeklyPriorities = priorities.map((p) => p.type === 'weekly' && <div key={`priority-${p.priorityId}`} className='d-flex justify-content-between' >
      <form className='col-sm-9'>
        <input className='col-1 completeCheck' type='checkbox' />
        <label className='col-11 text-left' htmlFor={`check-p-${p.priorityId}`}>
          {p.description}
          { p.link !== '' && <span>({<a href={p.link} target='_blank'>Resource</a>})</span> }
          { p.taggedUsers[0] && <FontAwesomeIcon className='ml-2 taggedIcon' icon={faUserTag} /> }
        </label>
      </form>
      <p className='text-right col-sm-3'>{p.dateDue}</p>
      </div>);

    return (
      <div className='PriorityCard'>
        <h3>Priorities</h3>
        <h5 className='text-left'>Daily</h5>
        {buildDailyPriorities}
        <h5 className='text-left'>Weekly</h5>
        {buildWeeklyPriorities}
        <div className='d-flex justify-content-end'>
          <button className='btn btn-outline-dark pt-0 pb-0 m-1' onClick={launchToDoModal} >New</button>
        </div>
      </div>
    );
  }
}

export default PriorityCard;
