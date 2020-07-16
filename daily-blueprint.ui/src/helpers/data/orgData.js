import axios from 'axios';

const baseUrl = 'https://localhost:44348/api/users';

const getAllOrgs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/organizations`)
    .then((orgs) => resolve(orgs))
    .catch((errFromUserData) => reject(errFromUserData));
});

export default { getAllOrgs };
