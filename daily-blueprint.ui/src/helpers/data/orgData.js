import axios from 'axios';

const baseUrl = 'https://localhost:44348/api/organizations';

const getAllOrgs = () => new Promise((resolve, reject) => {
  axios.get(baseUrl)
    .then((orgs) => resolve(orgs))
    .catch((errFromOrgData) => reject(errFromOrgData));
});

export default { getAllOrgs };
