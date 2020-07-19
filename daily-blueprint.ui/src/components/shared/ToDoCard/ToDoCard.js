/* eslint-disable react/jsx-no-target-blank */
import './ToDoCard.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ToDoShape from '../../../helpers/propz/ToDoShape';

class ToDoCard extends React.Component {
  static propTypes = {
    toDos: PropTypes.arrayOf(ToDoShape.toDoShape),
    toggleToDoModal: PropTypes.func,
  }

  render() {
    const { toDos, toggleToDoModal } = this.props;

    const buildToDos = toDos.map((t) => <div key={`toDo-${t.id}`} className='d-flex justify-content-between' >
        <form>
          <input className='col-1' type='checkbox' />
          <label className='col-11 text-left' htmlFor={`check-t-${t.id}`}>{t.description} { t.link !== '' && <span>({<a href={t.link} target='_blank'>Resource</a>})</span> }</label>
        </form>
        <p className='text-right'>{t.dateDue}</p>
      </div>);

    return (
      <div className='ToDoCard'>
        <h3>To Do</h3>
        {buildToDos}
        <div className='d-flex justify-content-end'>
          <button className='btn btn-outline-dark  pt-0 pb-0 m-1' onClick={toggleToDoModal} >New</button>
        </div>
      </div>
    );
  }
}

export default ToDoCard;
