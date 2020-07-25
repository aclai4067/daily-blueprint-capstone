/* eslint-disable react/jsx-no-target-blank */
import './ToDoCard.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ToDoShape from '../../../helpers/propz/ToDoShape';
import SingleToDo from '../SingleToDo/SingleToDo';

class ToDoCard extends React.Component {
  static propTypes = {
    toDos: PropTypes.arrayOf(ToDoShape.toDoShape),
    toggleToDoModal: PropTypes.func,
    updateToDos: PropTypes.func,
    userId: PropTypes.number,
  }

  launchToDoModal = () => {
    const { toggleToDoModal, setFromPriority } = this.props;
    setFromPriority(false);
    toggleToDoModal();
  };

  render() {
    const {
      toDos,
      setEditMode,
      updateToDos,
      userId,
    } = this.props;

    const buildToDos = toDos.length !== 0 ? toDos.map((t) => <SingleToDo key={`toDo-${t.id}`} toDo={t} launchToDoModal={this.launchToDoModal} setEditMode={setEditMode} updateToDos={updateToDos} userId={userId} />) 
      : <p>There Are No To-Dos To Display</p>;

    return (
      <div className='ToDoCard'>
        <h3>To Do</h3>
        {buildToDos}
        <div className='d-flex justify-content-end'>
          <button className='btn btn-outline-dark  pt-0 pb-0 m-1' onClick={this.launchToDoModal} >New</button>
        </div>
      </div>
    );
  }
}

export default ToDoCard;
