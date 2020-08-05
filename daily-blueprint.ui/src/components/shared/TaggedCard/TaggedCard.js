/* eslint-disable react/jsx-no-target-blank */
import './TaggedCard.scss';
import React from 'react';
import PropTypes from 'prop-types';
import TaggedToDoShape from '../../../helpers/propz/TaggedToDoShape';

class TaggedCard extends React.Component {
  static propTypes = {
    tags: PropTypes.arrayOf(TaggedToDoShape.taggedToDoShape),
    removeTag: PropTypes.func,
  }

  removeTagEvent = (e) => {
    e.preventDefault();
    const { removeTag } = this.props;
    const tagToRemove = e.target.value;
    removeTag(tagToRemove);
  }

  render() {
    const { tags } = this.props;

    const buildTags = tags.length !== 0 ? tags.map((t) => <div key={`tagged-${t.tagId}`} className='d-flex justify-content-between' >
        <p className='col-11 text-left'>{t.ownerName} needs your assistance with: {t.description} { t.link !== '' && <span>({<a href={t.link} target='_blank'>Resource</a>})</span> }</p>
        <button value={t.tagId} className='col-1 removeTag close' onClick={this.removeTagEvent}>X</button>
      </div>) : <p className='text-left offset-1 noTags'>You have not been tagged in any other user's to do items</p>;

    return (
      <div className='TaggedCard'>
        <h3>Tagged</h3>
        {buildTags}
      </div>
    );
  }
}

export default TaggedCard;
