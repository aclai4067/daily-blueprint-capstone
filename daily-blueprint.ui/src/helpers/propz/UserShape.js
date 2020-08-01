import PropTypes from 'prop-types';

const userShape = PropTypes.shape({
  id: PropTypes.number,
  tagId: PropTypes.number,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  firebaseUid: PropTypes.string.isRequired,
  organizationId: PropTypes.number.isRequired,
});

export default { userShape };
