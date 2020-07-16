import axios from 'axios';

const baseUrl = 'https://localhost:44348/api/users';

const getUserByFirebaseUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/firebase/${uid}`)
    .then((user) => resolve(user))
    .catch((errFromUserData) => reject(errFromUserData));
});

const createUser = (userObj) => axios.post(`${baseUrl}/newUser`, userObj);

export default { getUserByFirebaseUid, createUser };
