/* eslint-disable no-unused-expressions */
import './PriorityCard.scss';
import React from 'react';
import PropTypes from 'prop-types';
import PriorityShape from '../../../helpers/propz/PriorityShape';
import SingleToDo from '../SingleToDo/SingleToDo';

class PriorityCard extends React.Component {
  static propTypes = {
    priorities: PropTypes.arrayOf(PriorityShape.priorityShape),
    toggleToDoModal: PropTypes.func,
  }

  render() {
    const {
      priorities,
      toggleToDoModal,
      setFromPriority,
      teamView,
    } = this.props;

    const launchToDoModal = () => {
      setFromPriority(true);
      toggleToDoModal();
    };

    const buildDailyPriorities = priorities.map((p) => p.type === 'daily' && <SingleToDo key={`priority-${p.priorityId}`} setFromPriority={setFromPriority} toDo={p} />);

    const buildWeeklyPriorities = priorities.map((p) => p.type === 'weekly' && <SingleToDo key={`priority-${p.priorityId}`} setFromPriority={setFromPriority} toDo={p} />);

    return (
      <div className='PriorityCard'>
        <h3>Priorities</h3>
        <h5 className='text-left'>Daily</h5>
        {buildDailyPriorities}
        <h5 className='text-left'>Weekly</h5>
        {buildWeeklyPriorities}
        <div className='d-flex justify-content-end'>
          { teamView ? '' : <button className='btn btn-outline-dark pt-0 pb-0 m-1' onClick={launchToDoModal} >New</button>}
        </div>
      </div>
    );
  }
}

export default PriorityCard;
