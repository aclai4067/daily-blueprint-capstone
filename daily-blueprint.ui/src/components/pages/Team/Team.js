import './Team.scss';
import React from 'react';
import Moment from 'moment';
import teamsData from '../../../helpers/data/teamsData';
import UserShape from '../../../helpers/propz/UserShape';
import toDoData from '../../../helpers/data/toDoData';
import TeamPriorityCard from '../../shared/TeamPriorityCard/TeamPriorityCard';

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

  updateTeamDisplay = (e) => {
    e.preventDefault();
    const teamsArr = this.state.teams;
    const selectedTeamId = Number(e.target.value);
    const selectedTeam = teamsArr.find((t) => t.teamId === selectedTeamId);
    this.setState({ teamToDisplay: selectedTeam });
    this.getPrioritiesForCurrentTeam(selectedTeamId);
  }

  render() {
    const { teams, teamToDisplay, teamPriorities } = this.state;
    const currentDate = Moment().format('dddd, LL');

    const buildMemberPriorityCards = teamPriorities.map((p) => <TeamPriorityCard key={`member-${p.userId}`} teamPriorities={p} />);
    const buildTeamOptions = teams.map((t) => <option key={`team-${t.teamId}`} value={t.teamId}>{t.teamName}</option>);

    return (
      <div className='Team'>
        <div className='d-flex justify-content-around flex-wrap mt-1'>
          <h2 className='todaysDate text-left'>{currentDate}</h2>
          <div>
            <h2 className='teamName'>{teamToDisplay.teamName}</h2>
            { !teamToDisplay.isPrimary && <button>Make Primary</button> }
          </div>
          { teams.length > 1 && <form>
            <select className='form-control mt-1' id='selectedTeam' value='' onChange={this.updateTeamDisplay}>
              <option value='' disabled>Change Team</option>
              {buildTeamOptions}
            </select>
          </form> }
        </div>
        {buildMemberPriorityCards}
      </div>
    );
  }
}

export default Team;
