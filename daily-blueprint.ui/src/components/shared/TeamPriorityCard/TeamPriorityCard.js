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
      <div className='TeamPriorityCard d-flex flex-wrap col-10 offset-1 mt-2 mb-2'>
        <div className='userDetails col-md-3'>
          <img className='teamMemberImage card-img' src={teamPriorities.imageUrl} alt={teamPriorities.firstName} />
          <h5>{teamPriorities.firstName} {teamPriorities.lastName}</h5>
        </div>
        <div className='userPriorities col-md-9'>
          <PriorityCard priorities={teamPriorities.memberPriorities} teamView={true} />
        </div>
      </div>
    );
  }
}

export default TeamPriorityCard;
