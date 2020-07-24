import './Pomodoro.scss';
import React from 'react';

class Pomodoro extends React.Component {
  state = {
    timerActive: false,
    remainingTime: 120,
    displayTime: '2 : 00',
    session: 'work',
    workSessionCount: 0,
    workMinutes: 2,
    shortBreakMinutes: 1,
    longBreakMinutes: 2,
    sessionsUntilLongBreak: 2,
    totalSessions: 4,
    timerInterval: 0,
  }

  runTimer = (e) => {
    this.setState({ timerActive: true });
    const countdown = setInterval(() => {
      this.setState({ timerInterval: countdown });
      e.preventDefault();
      const {
        session,
        totalSessions,
        sessionsUntilLongBreak,
        workMinutes,
        shortBreakMinutes,
        longBreakMinutes,
      } = this.state;
      let minutes;
      let seconds;
      let time = this.state.remainingTime;
      time -= 1;
      this.setState({ remainingTime: time });
      minutes = Math.floor(time / 60);
      seconds = time - (minutes * 60);
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      this.setState({ displayTime: `${minutes} : ${seconds}` });
      if (time === 0) {
        if (session === 'work') { this.setState({ workSessionCount: this.state.workSessionCount + 1 }); }
        const { workSessionCount } = this.state;
        if (session === 'work' && workSessionCount % sessionsUntilLongBreak === 0) {
          this.setState({ session: 'long', remainingTime: longBreakMinutes * 60, displayTime: `${longBreakMinutes} : 00` });
          alert('Take a long break!');
        } else if (session === 'work' && workSessionCount % sessionsUntilLongBreak !== 0) {
          this.setState({ session: 'short', remainingTime: shortBreakMinutes * 60, displayTime: `${shortBreakMinutes} : 00` });
          alert('Take a short break!');
        } else if (workSessionCount === totalSessions) {
          this.stopTimer();
        } else if (session !== 'work' && workSessionCount < totalSessions) {
          this.setState({ session: 'work', remainingTime: workMinutes * 60, displayTime: `${workMinutes} : 00` });
          alert('Time to Work!');
        }
      }
    }, 1000);
  };

  pauseTimer = (e) => {
    e.preventDefault();
    clearInterval(this.state.timerInterval);
    this.setState({ timerActive: false });
  };

  stopTimer = () => {
    const { workMinutes } = this.state;
    const workSeconds = workMinutes * 60;
    clearInterval(this.state.timerInterval);
    this.setState({
      timerActive: false,
      remainingTime: workSeconds,
      displayTime: `${workMinutes} : 00`,
      workSessionCount: 0,
      session: 'work',
    });
  };

  render() {
    const {
      timerActive,
      displayTime,
      workMinutes,
      shortBreakMinutes,
      longBreakMinutes,
      sessionsUntilLongBreak,
      totalSessions,
    } = this.state;

    return (
      <div className='Pomodoro d-flex flex-wrap'>
        <h1 className='col-12'>Pomodoro Timer</h1>
        <div className='timerDetails col-4'>
          <div>
            <h4>Work Sessions Before Long Break</h4>
            <p>{sessionsUntilLongBreak}</p>
          </div>
          <div>
            <h4>Work Sessions Per Cycle</h4>
            <p>{totalSessions}</p>
          </div>
          <div>
            <h4>Work</h4>
            <p>{`${workMinutes} min`}</p>
          </div>
          <div>
            <h4>Short Break</h4>
            <p>{`${shortBreakMinutes} min`}</p>
          </div>
          <div>
            <h4>Long Break</h4>
            <p>{`${longBreakMinutes} min`}</p>
          </div>
        </div>
        <div className='timer col-8'>
          <div className='countdown'>
            <div className='timerBtns d-flex'>
              { timerActive ? <button onClick={this.pauseTimer}>Pause</button> : <button onClick={this.runTimer}>Start</button> }
              <button onClick={this.stopTimer}>Stop</button>
            </div>
            <h3>Work Time Remaining</h3>
            <p>{displayTime}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Pomodoro;
