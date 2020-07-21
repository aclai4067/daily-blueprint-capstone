/* eslint-disable react/jsx-no-target-blank */
import './SingleToDo.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTag } from '@fortawesome/free-solid-svg-icons';

class SingleToDo extends React.Component {
  render() {
    const { toDo, setFromPriority } = this.props;

    return (
      <div className='d-flex justify-content-between'>
        { setFromPriority ? [
          <form className='col-sm-9'>
            <input className='col-1 completeCheck' type='checkbox' id={`completePriority-${toDo.priorityId}`} />
            <label className='col-11 text-left' htmlFor={`completeToDo-${toDo.priorityId}`}>
              {toDo.description}
              { toDo.link !== '' && <span>({<a href={toDo.link} target='_blank'>Resource</a>})</span> }
              { toDo.taggedUsers[0] && <FontAwesomeIcon className='ml-2 taggedIcon' icon={faUserTag} /> }
            </label>
          </form>] : [<form className='col-sm-9'>
            <input className='col-1 completeCheck' type='checkbox' id={`completeToDo-${toDo.id}`} />
            <label className='col-11 text-left' htmlFor={`completeToDo-${toDo.id}`}>
            {toDo.description}
            { toDo.link !== '' && <span>({<a href={toDo.link} target='_blank'>Resource</a>})</span> }
            {/* { toDo.taggedUsers[0] && <FontAwesomeIcon className='ml-2 taggedIcon' icon={faUserTag} /> } */}
            </label>
          </form>]
        }
      <p className='text-right col-sm-3'>{toDo.dateDue}</p>
      </div>
    );
  }
}

export default SingleToDo;
