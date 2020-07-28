import axios from 'axios';

const baseUrl = 'https://localhost:44348/api/teams';

const getTeamsByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user/${userId}`)
    .then((teams) => resolve(teams))
    .catch((errorFromGetTeamsByUserId) => reject(errorFromGetTeamsByUserId));
});

const updatePrimaryTeam = (teamObj) => axios.put(`${baseUrl}/primary`, teamObj);

const addTeamMember = (teamMemberObj) => axios.post(`${baseUrl}/TeamMember`, teamMemberObj);

const removeTeamMember = (teamMemberObj) => axios.delete(`${baseUrl}/TeamMember/delete`, { data: teamMemberObj });

export default {
  getTeamsByUserId,
  updatePrimaryTeam,
  addTeamMember,
  removeTeamMember,
};
