import './PriorityCard.scss';
import React from 'react';
import PropTypes from 'prop-types';
import PriorityShape from '../../../helpers/propz/PriorityShape';
import SingleToDo from '../SingleToDo/SingleToDo';

class PriorityCard extends React.Component {
  static propTypes = {
    priorities: PropTypes.arrayOf(PriorityShape.priorityShape),
    toggleToDoModal: PropTypes.func,
    teamView: PropTypes.bool,
    updateToDos: PropTypes.func,
    setFromPriority: PropTypes.func,
    userId: PropTypes.number,
  }

  launchToDoModal = () => {
    const { toggleToDoModal, setFromPriority } = this.props;
    setFromPriority(true);
    toggleToDoModal();
  };

  launchTagModal = () => {
    const { toggleTagModal, setFromPriority } = this.props;
    setFromPriority(true);
    toggleTagModal();
  };

  render() {
    const {
      priorities,
      teamView,
      setEditMode,
      setToTag,
      updateToDos,
      userId,
    } = this.props;

    const dailyCheck = priorities.find((p) => p.type === 'daily');
    const weeklyCheck = priorities.find((p) => p.type === 'weekly');

    const buildDailyPriorities = dailyCheck ? priorities.map((p) => p.type === 'daily'
      && <SingleToDo key={`priority-${p.priorityId}`} launchToDoModal={this.launchToDoModal} launchTagModal={this.launchTagModal} fromPriority={true} toDo={p} setEditMode={setEditMode}
      setToTag={setToTag} teamView={teamView} updateToDos={updateToDos} userId={userId} />) : <p>No Daily Priorities To Display</p>;

    const buildWeeklyPriorities = weeklyCheck ? priorities.map((p) => p.type === 'weekly'
      && <SingleToDo key={`priority-${p.priorityId}`} launchToDoModal={this.launchToDoModal} launchTagModal={this.launchTagModal} fromPriority={true} toDo={p} setEditMode={setEditMode}
      setToTag={setToTag} teamView={teamView} updateToDos={updateToDos} userId={userId} />) : <p>No Weekly Priorities To Display</p>;

    return (
      <div className='PriorityCard'>
        <h3>Priorities</h3>
        <h5 className='text-left'>Daily</h5>
        { buildDailyPriorities }
        <h5 className='text-left'>Weekly</h5>
        { buildWeeklyPriorities }
        <div className='d-flex justify-content-end'>
          { teamView ? '' : <button className='btn btn-outline-dark pt-0 pb-0 m-1' onClick={this.launchToDoModal} >New</button>}
        </div>
      </div>
    );
  }
}

export default PriorityCard;
