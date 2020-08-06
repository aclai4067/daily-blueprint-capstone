import './TeamMemberModal.scss';
import React from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';
import TeamPrioritiesShape from '../../../helpers/propz/TeamPrioritiesShape';
import TeamShape from '../../../helpers/propz/TeamShape';
import userData from '../../../helpers/data/userData';
import teamsData from '../../../helpers/data/teamsData';

class TeamMemberModal extends React.Component {
  state = {
    checkTeamLead: false,
    teamMembers: [],
    unassignedUsers: [],
    userToAdd: '',
  }

  static propTypes = {
    getAllTeamData: PropTypes.func,
    organizationId: PropTypes.number,
    teamPriorities: PropTypes.arrayOf(TeamPrioritiesShape.teamPrioritiesShape),
    team: TeamShape.teamShape,
    teamModalIsOpen: PropTypes.bool,
    toggleTeamModal: PropTypes.func,
    userId: PropTypes.number,
    orgId: PropTypes.number,
  }

  componentDidUpdate(prevProps) {
    if (this.props.teamModalIsOpen && (this.props.teamModalIsOpen !== prevProps.teamModalIsOpen || this.props.teamPriorities !== prevProps.teamPriorities)) {
      const { orgId } = this.props;
      this.getAllUsers(orgId);
    }
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
          if (teamMate === undefined) {
            unassigned.push(u);
          } else {
            team.push(u);
          }
        });
        this.setState({ teamMembers: team, unassignedUsers: unassigned });
      }).catch((errorFromGetAllUsers) => console.error(errorFromGetAllUsers));
  }

  addTeamMate = (e) => {
    e.preventDefault();
    const { checkTeamLead, userToAdd } = this.state;
    const { team, userId, getAllTeamData } = this.props;
    const teamMate = {
      userId: Number(userToAdd),
      teamId: team.teamId,
      isTeamLead: checkTeamLead,
      isPrimary: false,
    };
    teamsData.addTeamMember(teamMate)
      .then(() => {
        getAllTeamData(userId);
        this.setState({ userToAdd: '', checkTeamLead: false });
      }).catch((errorFromAddTeammate) => console.error(errorFromAddTeammate));
  }

  deleteTeamMate = (e) => {
    e.preventDefault();
    const { team, getAllTeamData, userId } = this.props;
    const userToRemove = {
      userId: Number(e.target.value),
      teamId: team.teamId,
    };
    teamsData.removeTeamMember(userToRemove)
      .then(() => {
        getAllTeamData(userId);
        this.setState({ userToAdd: '', checkTeamLead: false });
      }).catch((errorFromDeleteTeammate) => console.error(errorFromDeleteTeammate));
  }

  dismissTeamModal = (e) => {
    e.preventDefault();
    const { toggleTeamModal } = this.props;
    this.setState({ userToAdd: '', checkTeamLead: false });
    toggleTeamModal();
  }

  teamLeadChange = (e) => {
    const isLead = e.target.checked;
    this.setState({ checkTeamLead: isLead });
  }

  userToAddChange = (e) => {
    e.preventDefault();
    const userId = e.target.value;
    this.setState({ userToAdd: userId });
  }

  buildTeamList = () => this.state.teamMembers.map((t) => <div key={`teamMember-${t.id}`} className='currentTeammate col-5 d-flex'><p>{`${t.firstName} ${t.lastName}`}</p>
      <button className='btn close' value={t.id} onClick={this.deleteTeamMate}>X</button></div>);

  buildStaffDropdown = () => this.state.unassignedUsers.map((u) => <option key={`staff-${u.id}`} value={u.id}>{`${u.firstName} ${u.lastName}`}</option>);

  render() {
    const {
      checkTeamLead,
      userToAdd,
    } = this.state;
    const {
      teamModalIsOpen,
      toggleTeamModal,
    } = this.props;

    return (
      <div className='TeamMemberModal'>
        <Modal isOpen={teamModalIsOpen} toggle={toggleTeamModal} className={'editTeamModal'}>
          <ModalBody>
            <div>
              <form className='unassignedUsers'>
                <h5 className='col-12'>Add New Team Members</h5>
                <select className='form-control newTeammateInput' id='userInput' value={userToAdd} onChange={this.userToAddChange}>
                  <option value='' disabled defaultValue>Select a Team Member</option>
                  {this.buildStaffDropdown()}
                </select>
                <div>
                  <div>
                    <input type='checkbox' className='teamLeadCheckbox' data-val='true' id='teamLeadCheck' checked={checkTeamLead} onChange={this.teamLeadChange} />
                    <label htmlFor='teamLeadCheck'>Make User Team Lead</label>
                  </div>
                  <button className='btn btn-secondary' onClick={this.addTeamMate}>Add</button>
                </div>
              </form>
              <div className='teamMembers d-flex flex-wrap'>
                <h5 className='col-12'>Current Team Members</h5>
                {this.buildTeamList()}
              </div>
              <Button className='dismissModal' onClick={this.dismissTeamModal}>Done</Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default TeamMemberModal;
