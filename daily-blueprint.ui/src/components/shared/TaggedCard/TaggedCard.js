/* eslint-disable react/jsx-no-target-blank */
import './TaggedCard.scss';
import React from 'react';
import PropTypes from 'prop-types';
import TaggedToDoShape from '../../../helpers/propz/TaggedToDoShape';

class TaggedCard extends React.Component {
  static propTypes = {
    tags: PropTypes.arrayOf(TaggedToDoShape.taggedToDoShape),
  }

  render() {
    const { tags } = this.props;

    const buildTags = tags.map((t) => <div key={`tagged-${t.id}`} className='d-flex justify-content-between' >
        <p className='col-11 text-left'>{t.ownerName} needs your assistance with: {t.description} { t.link !== '' && <span>({<a href={t.link} target='_blank'>Resource</a>})</span> }</p>
        <button className='col-1 removeTag close'>X</button>
      </div>);

    return (
      <div className='TaggedCard'>
        <h3>To Do</h3>
        {buildTags}
      </div>
    );
  }
}

export default TaggedCard;
