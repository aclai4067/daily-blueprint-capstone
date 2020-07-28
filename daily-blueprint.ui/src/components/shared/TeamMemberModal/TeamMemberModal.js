import './TeamMemberModal.scss';
import React from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';
import TeamPrioritiesShape from '../../../helpers/propz/TeamPrioritiesShape';
import TeamShape from '../../../helpers/propz/TeamShape';
import userData from '../../../helpers/data/userData';

class TeamMemberModal extends React.Component {
  state = {
    checkTeamLead: false,
    teamMembers: [],
    unassignedUsers: [],
  }

  static propTypes = {
    organizationId: PropTypes.number,
    teamPriorities: PropTypes.arrayOf(TeamPrioritiesShape.teamPrioritiesShape),
    teamToDisplay: TeamShape.teamShape,
    teamModalIsOpen: PropTypes.bool,
    toggleTeamModal: PropTypes.func,
  }

  componentDidMount() {
    const { orgId } = this.props;
    this.getAllUsers(orgId);
  }

  getAllUsers = (orgId) => {
    const { teamPriorities } = this.props;
    userData.getAllUsersByOrg(orgId)
      .then((results) => {
        const allUsers = results.data;
        const team = [];
        const unassigned = [];
        allUsers.forEach((u) => {
          const teamMate = teamPriorities.find((tp) => tp.userId === u.id);
          if (teamMate) {
            team.push(u);
          } else {
            unassigned.push(u);
          }
        });
        this.setState({ teamMembers: team, unassignedUsers: unassigned });
      }).catch((errorFromGetAllUsers) => console.error(errorFromGetAllUsers));
  }

  teamLeadChange = (e) => {
    const isLead = e.target.checked;
    this.setState({ checkTeamLead: isLead });
  }

  render() {
    const { checkTeamLead, teamMembers, unassignedUsers } = this.state;
    const {
      teamModalIsOpen,
      toggleTeamModal,
    } = this.props;

    const buildTeamList = () => teamMembers.map((t) => <div key={`teamMember-${t.id}`} className='col-sm-4 d-flex'><p>{`${t.firstName} ${t.lastName}`}</p><button className='btn close'>X</button></div>);

    return (
      <div className='TeamMemberModal'>
        <Modal isOpen={teamModalIsOpen} toggle={toggleTeamModal} className={'editTeamModal'}>
          <ModalBody>
            <div>
              <form className='unassignedUsers'>
                <select></select>
                <div>
                  <div>
                    <input type='checkbox' className='teamLeadCheckbox' data-val='true' id='teamLeadCheck' value={checkTeamLead} onChange={this.teamLeadChange} />
                    <label htmlFor='teamLeadCheck'>Make User Team Lead</label>
                  </div>
                  <button className='btn btn-secondary'>Add</button>
                </div>
              </form>
              <div className='teamMemembers d-flex flex-wrap'>
                {buildTeamList}
              </div>
              <Button className='dismissModal' onClick={this.toggleTeamModal}>Done</Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default TeamMemberModal;
