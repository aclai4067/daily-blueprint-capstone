import PropTypes from 'prop-types';

const toDoShape = PropTypes.shape({
  id: PropTypes.number,
  description: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  dateDue: PropTypes.string.isRequired,
  ownerUserId: PropTypes.number.isRequired,
  isComplete: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
});

export default { toDoShape };
