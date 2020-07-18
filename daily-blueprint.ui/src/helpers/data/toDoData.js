import axios from 'axios';

const baseUrl = 'https://localhost:44348/api/toDos';

const getUserPriorities = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/priorities/user/${userId}`)
    .then((priorities) => resolve(priorities))
    .catch((errorFromGetUserPriorities) => reject(errorFromGetUserPriorities));
});

export default { getUserPriorities };
