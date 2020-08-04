import './Pomodoro.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import {
  faPlayCircle,
  faPauseCircle,
  faStopCircle,
  faDotCircle,
  faCheckCircle,
} from '@fortawesome/free-regular-svg-icons';
import chime from './Computer_Magic.mp3';
import workChime from './watch_alarm.mp3';
import pomodoroData from '../../../helpers/data/pomodoroData';
import PomodoroModal from '../../shared/PomodoroModal/PomodoroModal';

class Pomodoro extends React.Component {
  state = {
    timerActive: false,
    remainingTime: 1500,
    elaspsedDasharray: 276,
    totalTime: 1500,
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
    timerId: 0,
    pomodoroModalIsOpen: false,
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
          totalTime: workSeconds,
          displayTime: `${settings.workMinutes} : 00`,
          workMinutes: settings.workMinutes,
          shortBreakMinutes: settings.shortBreakMinutes,
          longBreakMinutes: settings.longBreakMinutes,
          sessionsUntilLongBreak: settings.sessionsUntilLongBreak,
          totalSessions: settings.totalSessions,
          timerId: settings.id,
        });
      }).catch(() => this.setState({ isCustom: false }));
  }

  togglePomodoroModal = (e) => {
    e.preventDefault();
    this.setState({ pomodoroModalIsOpen: !this.state.pomodoroModalIsOpen });
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
      seconds = time % 60;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      this.setState({ displayTime: `${minutes} : ${seconds}` });
      this.setTimerCircle();
      if (time === 0) {
        this.setState({ elaspsedDasharray: 283 });
        if (session === 'work') { this.setState({ workSessionCount: this.state.workSessionCount + 1 }); }
        const { workSessionCount } = this.state;
        if (session === 'work' && workSessionCount % sessionsUntilLongBreak === 0) {
          this.setState({
            session: 'long',
            remainingTime: longBreakMinutes * 60,
            totalTime: longBreakMinutes * 60,
            displayTime: `${longBreakMinutes} : 00`,
          });
          this.playEndOfWorkSessionAlert();
          // alert('Take a long break!');
        } else if (session === 'work' && workSessionCount % sessionsUntilLongBreak !== 0) {
          this.setState({
            session: 'short',
            remainingTime: shortBreakMinutes * 60,
            totalTime: shortBreakMinutes * 60,
            displayTime: `${shortBreakMinutes} : 00`,
          });
          this.playEndOfWorkSessionAlert();
          // alert('Take a short break!');
        } else if (workSessionCount === totalSessions) {
          this.stopTimer();
        } else if (session !== 'work' && workSessionCount < totalSessions) {
          this.playEndOfBreakSessionAlert();
          this.setState({
            session: 'work',
            remainingTime: workMinutes * 60,
            totalTime: workMinutes * 60,
            displayTime: `${workMinutes} : 00`,
          });
          // alert('Time to Work!');
        }
        this.buildSessionTracker();
      }
    }, 1000);
  };

  setTimerCircle = () => {
    const { totalTime, remainingTime } = this.state;
    const remainingFraction = remainingTime / totalTime;
    const remainingDasharray = `${(remainingFraction * 276).toFixed(0)} 276`;
    this.setState({ elaspsedDasharray: remainingDasharray });
  }

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
      elaspsedDasharray: 283,
      totalTime: workSeconds,
      displayTime: `${workMinutes} : 00`,
      workSessionCount: 0,
      session: 'work',
    });
  };

  playEndOfWorkSessionAlert = () => {
    const sessionChime = document.getElementById('startBreakAlertChime');
    sessionChime.play();
  }

  playEndOfBreakSessionAlert = () => {
    const sessionChime = document.getElementById('startWorkAlertChime');
    sessionChime.currentTime = 8.5;
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
    this.setState({ sessionsUntilLongBreak: Number(e.target.value) });
  }

  totalSessionsChange = (e) => {
    e.preventDefault();
    this.setState({ totalSessions: Number(e.target.value) });
  }

  workMinutesChange = (e) => {
    e.preventDefault();
    this.setState({ workMinutes: Number(e.target.value) });
  }

  shortBreakMinutesChange = (e) => {
    e.preventDefault();
    this.setState({ shortBreakMinutes: Number(e.target.value) });
  }

  longBreakMinutesChange = (e) => {
    e.preventDefault();
    this.setState({ longBreakMinutes: Number(e.target.value) });
  }

  setEditTimer = (e) => {
    e.preventDefault();
    this.setState({ editTimer: true });
  }

  saveTimerSettingsEvent = (e) => {
    e.preventDefault();
    const { isCustom, timerId } = this.state;
    const { user } = this.props;
    const timerObj = {
      userId: user.id,
      totalSessions: this.state.totalSessions,
      sessionsUntilLongBreak: this.state.sessionsUntilLongBreak,
      workMinutes: this.state.workMinutes,
      shortBreakMinutes: this.state.shortBreakMinutes,
      longBreakMinutes: this.state.longBreakMinutes,
    };
    if (isCustom) {
      timerObj.id = timerId;
      pomodoroData.updatePomodoro(timerObj)
        .then(() => {
          this.setState({ editTimer: false });
          this.stopTimer();
        }).catch((errorFromUpdateTimer) => console.error(errorFromUpdateTimer));
    } else {
      pomodoroData.createPomodoro(timerObj)
        .then((results) => {
          this.setState({ isCustom: true, editTimer: false, timerId: results.data.id });
          this.stopTimer();
        }).catch((errorFromCreateTimer) => console.error(errorFromCreateTimer));
    }
  }

  render() {
    const {
      timerActive,
      displayTime,
      elaspsedDasharray,
      workMinutes,
      shortBreakMinutes,
      longBreakMinutes,
      session,
      sessionsUntilLongBreak,
      totalSessions,
      editTimer,
      pomodoroModalIsOpen,
    } = this.state;

    return (
      <div className='Pomodoro d-flex flex-wrap'>
        <div className='timerDetails col-md-4 d-flex flex-column justify-content-around'>
          <div>
            <h4>Work Sessions Before Long Break</h4>
            { editTimer ? <input type='number' min={1} value={sessionsUntilLongBreak} onChange={this.sessionsUntilLongBreakchange} /> : <p className='setting'>{sessionsUntilLongBreak}</p> }
          </div>
          <div>
            <h4>Work Sessions Per Cycle</h4>
            { editTimer ? <input type='number' min={1} value={totalSessions} onChange={this.totalSessionsChange} /> : <p className='setting'>{totalSessions}</p> }
          </div>
          <div>
            <h4>Work Time</h4>
            { editTimer ? <input type='number' min={1} value={workMinutes} onChange={this.workMinutesChange} /> : <p className='setting'>{`${workMinutes} min`}</p> }
          </div>
          <div>
            <h4>Short Break Time</h4>
            { editTimer ? <input type='number' min={1} value={shortBreakMinutes} onChange={this.shortBreakMinutesChange} /> : <p className='setting'>{`${shortBreakMinutes} min`}</p> }
          </div>
          <div>
            <h4>Long Break Time</h4>
            { editTimer ? <input type='number' min={1} value={longBreakMinutes} onChange={this.longBreakMinutesChange} /> : <p className='setting'>{`${longBreakMinutes} min`}</p> }
          </div>
          <div>
            { editTimer ? <button className='btn btn-outline-secondary mt-2' onClick={this.saveTimerSettingsEvent}>Save</button> : <button className='btn btn-secondary settingsBtn mt-2'
              onClick={this.setEditTimer}>Settings</button> }
          </div>
        </div>
        <div className='timer col-md-8 pt-sm-3'>
          <h1 className='col-12'>Pomodoro Timer <FontAwesomeIcon className='FAinfo' onClick={this.togglePomodoroModal} icon={faInfoCircle}/></h1>
          <div className='countdown'>
            <div className='timerBtns d-flex justify-content-center'>
              { timerActive ? <button className='btn close timerControlBtn' onClick={this.pauseTimer}><FontAwesomeIcon className='m-2 timerControlIcon' icon={faPauseCircle} /></button>
                : <button className='btn close timerControlBtn' onClick={this.runTimer}><FontAwesomeIcon className='m-2 timerControlIcon' icon={faPlayCircle} /></button> }
              <button className='btn close timerControlBtn' onClick={this.stopTimer}><FontAwesomeIcon className='m-2 timerControlIcon' icon={faStopCircle} /></button>
            </div>
            { session === 'work' ? <h3>Work Time Remaining</h3> : <h3>Break Time Remaining</h3>}
            <div className='timerDisplay'>
              <svg className='timerBackground' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
                <g class='timerCircle'>
                  <circle className='timeElapsed' cx='50' cy='50' r='45'></circle>
                  <path
                  id='remainingTimeDisplay'
                  strokeDasharray={elaspsedDasharray}
                  class='timeRemaining'
                  d='
                    M 50, 50
                    m -45, 0
                    a 45,45 0 1,0 90,0
                    a 45,45 0 1,0 -90,0
                  '
                  ></path>
                </g>
              </svg>
              <span className='timerCountdown'>{displayTime}</span>
            </div>
          </div>
          <div className='sessionTrackerContainer'>
            {this.buildSessionTracker()}
          </div>
          <audio id='startBreakAlertChime'>
            <source src={chime}></source>
          </audio>
          <audio id='startWorkAlertChime'>
            <source src={workChime}></source>
          </audio>
        </div>
        <PomodoroModal pomodoroModalIsOpen={pomodoroModalIsOpen} togglePomodoroModal={this.togglePomodoroModal} />
      </div>
    );
  }
}

export default Pomodoro;
