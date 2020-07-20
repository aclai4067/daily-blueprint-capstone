import PropTypes from 'prop-types';
import PriorityShape from './PriorityShape';

const teamPrioritiesShape = PropTypes.shape({
  userId: PropTypes.number,
  teamId: PropTypes.number.isRequired,
  isTeamLead: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  firebaseUid: PropTypes.string.isRequired,
  organizationId: PropTypes.number.isRequired,
  memberPriorities: PropTypes.arrayOf(PriorityShape.priorityShape),
});

export default { teamPrioritiesShape };
