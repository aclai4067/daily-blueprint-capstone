import axios from 'axios';

const baseUrl = 'https://localhost:44348/api/toDos';

const getUserPriorities = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/priorities/user/${userId}`)
    .then((priorities) => resolve(priorities))
    .catch((errorFromGetUserPriorities) => reject(errorFromGetUserPriorities));
});

const getUserToDos = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user/${userId}`)
    .then((priorities) => resolve(priorities))
    .catch((errorFromGetUserToDos) => reject(errorFromGetUserToDos));
});

const getUserTags = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/tagged/user/${userId}`)
    .then((priorities) => resolve(priorities))
    .catch((errorFromGetUserTags) => reject(errorFromGetUserTags));
});

export default { getUserPriorities, getUserToDos, getUserTags };
