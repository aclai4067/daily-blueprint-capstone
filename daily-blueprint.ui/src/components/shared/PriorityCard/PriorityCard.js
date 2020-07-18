/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-target-blank */
import './PriorityCard.scss';
import React from 'react';
import PropTypes from 'prop-types';
import PriorityShape from '../../../helpers/propz/PriorityShape';

class PriorityCard extends React.Component {
  static propTypes = {
    priorities: PropTypes.arrayOf(PriorityShape.priorityShape),
  }

  render() {
    const { priorities } = this.props;

    const buildDailyPriorities = priorities.map((p) => p.type === 'daily' && <div key={`priority-${p.priorityId}`} className='d-flex justify-content-between' >
        <form>
          <input className='col-1' type='checkbox' />
          <label className='col-11 text-left' htmlFor={`check-p-${p.priorityId}`}>{p.description} { p.link !== '' && <span>({<a href={p.link} target='_blank'>Resource</a>})</span> }</label>
        </form>
        <p className='text-right'>{p.dateDue}</p>
      </div>);

    const buildWeeklyPriorities = priorities.map((p) => p.type === 'weekly' && <div key={`priority-${p.priorityId}`} className='d-flex justify-content-between' >
      <form>
        <input className='col-1' type='checkbox' />
        <label className='col-11 text-left' htmlFor={`check-p-${p.priorityId}`}>{p.description}  { p.link !== '' && <span>({<a href={p.link} target='_blank'>Resource</a>})</span> }</label>
      </form>
      <p className='text-right'>{p.dateDue}</p>
      </div>);

    return (
      <div className='PriorityCard'>
        <h3>Priorities</h3>
        <h5 className='text-left'>Daily</h5>
        {buildDailyPriorities}
        <h5 className='text-left'>Weekly</h5>
        {buildWeeklyPriorities}
      </div>
    );
  }
}

export default PriorityCard;
