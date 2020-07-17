import axios from 'axios';

const baseUrl = 'https://localhost:44348/api/organizations';

const getAllOrgs = () => new Promise((resolve, reject) => {
  axios.get(baseUrl)
    .then((orgs) => resolve(orgs))
    .catch((errFromUserData) => reject(errFromUserData));
});

export default { getAllOrgs };
