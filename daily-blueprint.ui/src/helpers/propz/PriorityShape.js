import PropTypes from 'prop-types';

const priorityShape = PropTypes.shape({
  priorityId: PropTypes.number,
  toDoId: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  priorityDate: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  dateDue: PropTypes.string.isRequired,
  ownerUserId: PropTypes.number.isRequired,
  isComplete: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
});

export default { priorityShape };
