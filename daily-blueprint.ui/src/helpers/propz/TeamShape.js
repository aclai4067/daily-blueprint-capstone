import PropTypes from 'prop-types';

const teamShape = PropTypes.shape({
  teamId: PropTypes.number,
  isTeamLead: PropTypes.bool.isRequired,
  isPrimary: PropTypes.bool.isRequired,
  TeamName: PropTypes.string.isRequired,
});

export default { teamShape };
