import React from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';

class PomodoroModal extends React.Component {
  static propTypes = {
    pomodoroModalIsOpen: PropTypes.bool,
    togglePomodoroModal: PropTypes.func,
  }

  render() {
    const {
      pomodoroModalIsOpen,
      togglePomodoroModal,
    } = this.props;

    return (
      <div className='TagModal'>
        <Modal isOpen={pomodoroModalIsOpen} toggle={togglePomodoroModal} className={'editTagModal'}>
          <ModalBody>
            <div>
              <h3>What is a Pomodoro Timer?</h3>
              <p>The Pomodoro technique, created by Francesco Cirillo, is a time management strategy that uses a timer to break focused work time into intervals with short breaks in between.</p>
              <p>After multiple work sessions, traditionally 4, a longer break is taken. The recommended work session length is 25 minutes, with 5 minute short breaks and 15 minute long breaks.</p>
              <p>You may adjust your durations, as well as the number of sessions, to whatever best suites your needs by clicking the "settings" button!</p>
              <Button className='dismissModal' onClick={togglePomodoroModal}>Got It</Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default PomodoroModal;
