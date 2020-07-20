import './TeamPriorityCard.scss';
import React from 'react';
import PriorityCard from '../PriorityCard/PriorityCard';
import TeamPrioritiesShape from '../../../helpers/propz/TeamPrioritiesShape';

class TeamPriorityCard extends React.Component {
  static propTypes = {
    teamPriorities: TeamPrioritiesShape.teamPrioritiesShape,
  }

  render() {
    const { teamPriorities } = this.props;

    return (
      <div className='TeamPriorityCard d-flex'>
        <div className='userDetails col-3'>
          <img className='teamMemberImage' src={teamPriorities.imageUrl} alt={teamPriorities.firstName} />
          <h5>{teamPriorities.firstName} {teamPriorities.lastName}</h5>
        </div>
        <div className='userPriorities col-9'>
          <PriorityCard priorities={teamPriorities.memberPriorities} />
        </div>
      </div>
    );
  }
}

export default TeamPriorityCard;
