import axios from 'axios';

const baseUrl = 'https://localhost:44348/api/pomodoro';

const findPomodoroByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/${userId}`)
    .then((settings) => resolve(settings))
    .catch((errFromGetTimer) => reject(errFromGetTimer));
});

const createPomodoro = (timerObj) => axios.post(`${baseUrl}/create`, timerObj);

const updatePomodoro = (timerObj) => axios.put(`${baseUrl}/edit`, timerObj);

export default { findPomodoroByUserId, createPomodoro, updatePomodoro };
