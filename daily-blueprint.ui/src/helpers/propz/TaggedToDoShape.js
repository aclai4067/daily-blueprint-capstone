import PropTypes from 'prop-types';

const taggedToDoShape = PropTypes.shape({
  tagId: PropTypes.number,
  userId: PropTypes.number.isRequired,
  toDoId: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  dateDue: PropTypes.string.isRequired,
  ownerUserId: PropTypes.number.isRequired,
  isComplete: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
});

export default { taggedToDoShape };
