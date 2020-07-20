import './Team.scss';
import React from 'react';
import teamsData from '../../../helpers/data/teamsData';
import UserShape from '../../../helpers/propz/UserShape';
import toDoData from '../../../helpers/data/toDoData';

class Team extends React.Component {
  state = {
    teams: [],
    teamToDisplay: {},
    teamPriorities: [],
  }

  static propTypes = {
    user: UserShape.userShape,
  }

  componentDidMount() {
    const { user } = this.props;
    teamsData.getTeamsByUserId(user.id)
      .then((userTeams) => {
        const teamsArr = userTeams.data;
        const primary = teamsArr.find((t) => t.isPrimary === true);
        this.setState({ teams: teamsArr, teamToDisplay: primary });
        this.getPrioritiesForCurrentTeam(primary.teamId);
      }).catch((errorFromTeamsComponentDidMount) => console.error(errorFromTeamsComponentDidMount));
  }

  getPrioritiesForCurrentTeam = (teamId) => {
    toDoData.getTeamPriorities(teamId)
      .then((priorities) => this.setState({ teamPriorities: priorities.data }))
      .catch((errorFromGetPrioritiesForCurrentTeam) => console.error(errorFromGetPrioritiesForCurrentTeam));
  };

  render() {
    return (
      <div className='Team'>
        <h1>Team</h1>
      </div>
    );
  }
}

export default Team;
