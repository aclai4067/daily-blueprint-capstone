import axios from 'axios';

const baseUrl = 'https://localhost:44348/api/teams';

const getTeamsByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user/${userId}`)
    .then((teams) => resolve(teams))
    .catch((errorFromGetTeamsByUserId) => reject(errorFromGetTeamsByUserId));
});

export default { getTeamsByUserId };
