import './Pomodoro.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import {
  faPlayCircle,
  faPauseCircle,
  faStopCircle,
  faDotCircle,
  faCheckCircle,
} from '@fortawesome/free-regular-svg-icons';
import chime from './Computer_Magic.mp3';
import pomodoroData from '../../../helpers/data/pomodoroData';

class Pomodoro extends React.Component {
  state = {
    timerActive: false,
    remainingTime: 1500,
    displayTime: '25 : 00',
    session: 'work',
    workSessionCount: 0,
    workMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    sessionsUntilLongBreak: 4,
    totalSessions: 8,
    timerInterval: 0,
    isCustom: false,
    editTimer: false,
  }

  componentDidMount() {
    const { user } = this.props;
    pomodoroData.findPomodoroByUserId(user.id)
      .then((results) => {
        const settings = results.data;
        const workSeconds = settings.workMinutes * 60;
        this.setState({
          isCustom: true,
          remainingTime: workSeconds,
          displayTime: `${settings.workMinutes} : 00`,
          workMinutes: settings.workMinutes,
          shortBreakMinutes: settings.shortBreakMinutes,
          longBreakMinutes: settings.longBreakMinutes,
          sessionsUntilLongBreak: settings.sessionsUntilLongBreak,
          totalSessions: settings.totalSessions,
        });
      }).catch(() => this.setState({ isCustom: false }));
  }

  runTimer = (e) => {
    e.preventDefault();
    this.setState({ timerActive: true });
    this.buildSessionTracker();
    const countdown = setInterval(() => {
      this.setState({ timerInterval: countdown });
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
        this.playEndOfSessionAlert();
        if (session === 'work') { this.setState({ workSessionCount: this.state.workSessionCount + 1 }); }
        const { workSessionCount } = this.state;
        if (session === 'work' && workSessionCount % sessionsUntilLongBreak === 0) {
          this.setState({ session: 'long', remainingTime: longBreakMinutes * 60, displayTime: `${longBreakMinutes} : 00` });
          // alert('Take a long break!');
        } else if (session === 'work' && workSessionCount % sessionsUntilLongBreak !== 0) {
          this.setState({ session: 'short', remainingTime: shortBreakMinutes * 60, displayTime: `${shortBreakMinutes} : 00` });
          // alert('Take a short break!');
        } else if (workSessionCount === totalSessions) {
          this.stopTimer();
        } else if (session !== 'work' && workSessionCount < totalSessions) {
          this.setState({ session: 'work', remainingTime: workMinutes * 60, displayTime: `${workMinutes} : 00` });
          // alert('Time to Work!');
        }
        this.buildSessionTracker();
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

  playEndOfSessionAlert = () => {
    const sessionChime = document.getElementById('sessionAlertChime');
    sessionChime.play();
  }

  buildSessionTracker = () => {
    const {
      workSessionCount,
      timerActive,
      totalSessions,
      session,
    } = this.state;
    let remaining = totalSessions - workSessionCount;
    const sessionIndicators = [];
    for (let i = 0; i < workSessionCount; i += 1) {
      sessionIndicators.push({ id: `session${i}`, icon: faCheckCircle });
    }
    if (timerActive && session === 'work') {
      remaining -= 1;
      sessionIndicators.push({ id: `session${workSessionCount}`, icon: faDotCircle });
    }
    for (let n = 0; n < remaining; n += 1) {
      sessionIndicators.push({ id: `session${n + 1 + workSessionCount}`, icon: faCircle });
    }
    return sessionIndicators.map((si) => <FontAwesomeIcon key={si.id} className='m-2 sessionIndicatorIcon' icon={si.icon} />);
  }

  sessionsUntilLongBreakchange = (e) => {
    e.preventDefault();
    this.setState({ sessionsUntilLongBreak: e.target.value });
  }

  totalSessionsChange = (e) => {
    e.preventDefault();
    this.setState({ totalSessions: e.target.value });
  }

  workMinutesChange = (e) => {
    e.preventDefault();
    this.setState({ workMinutes: e.target.value });
  }

  shortBreakMinutesChange = (e) => {
    e.preventDefault();
    this.setState({ shortBreakMinutes: e.target.value });
  }

  longBreakMinutesChange = (e) => {
    e.preventDefault();
    this.setState({ longBreakMinutes: e.target.value });
  }

  setEditTimer = (e) => {
    e.preventDefault();
    this.setState({ editTimer: true });
  }

  render() {
    const {
      timerActive,
      displayTime,
      workMinutes,
      shortBreakMinutes,
      longBreakMinutes,
      sessionsUntilLongBreak,
      totalSessions,
      editTimer,
    } = this.state;

    return (
      <div className='Pomodoro d-flex flex-wrap'>
        <h1 className='col-12'>Pomodoro Timer</h1>
        <div className='timerDetails col-4'>
          <div>
            <h4>Work Sessions Before Long Break</h4>
            { editTimer ? <input type='number' min={1} value={sessionsUntilLongBreak} onChange={this.sessionsUntilLongBreakchange} /> : <p>{sessionsUntilLongBreak}</p> }
          </div>
          <div>
            <h4>Work Sessions Per Cycle</h4>
            { editTimer ? <input type='number' min={1} value={totalSessions} onChange={this.totalSessionsChange} /> : <p>{totalSessions}</p> }
          </div>
          <div>
            <h4>Work</h4>
            { editTimer ? <input type='number' min={1} value={workMinutes} onChange={this.workMinutesChange} /> : <p>{`${workMinutes} min`}</p> }
          </div>
          <div>
            <h4>Short Break</h4>
            { editTimer ? <input type='number' min={1} value={shortBreakMinutes} onChange={this.shortBreakMinutesChange} /> : <p>{`${shortBreakMinutes} min`}</p> }
          </div>
          <div>
            <h4>Long Break</h4>
            { editTimer ? <input type='number' min={1} value={longBreakMinutes} onChange={this.longBreakMinutesChange} /> : <p>{`${longBreakMinutes} min`}</p> }
          </div>
          <div>
            { editTimer ? <button>Save</button> : <button onClick={this.setEditTimer}>Settings</button> }
          </div>
        </div>
        <div className='timer col-8'>
          <div className='countdown'>
            <div className='timerBtns d-flex'>
              { timerActive ? <button className='btn close timerControlBtn' onClick={this.pauseTimer}><FontAwesomeIcon className='m-2 timerControlIcon' icon={faPauseCircle} /></button>
                : <button className='btn close timerControlBtn' onClick={this.runTimer}><FontAwesomeIcon className='m-2 timerControlIcon' icon={faPlayCircle} /></button> }
              <button className='btn close timerControlBtn' onClick={this.stopTimer}><FontAwesomeIcon className='m-2 timerControlIcon' icon={faStopCircle} /></button>
            </div>
            <h3>Work Time Remaining</h3>
            <p>{displayTime}</p>
          </div>
          <div className='sessionTrackerContainer'>
            {this.buildSessionTracker()}
          </div>
          <audio id='sessionAlertChime'>
            <source src={chime}></source>
          </audio>
        </div>
      </div>
    );
  }
}

export default Pomodoro;
