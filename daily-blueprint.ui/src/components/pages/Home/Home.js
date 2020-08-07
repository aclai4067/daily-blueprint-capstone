import './Home.scss';
import React from 'react';
import Moment from 'react-moment';
import UserShape from '../../../helpers/propz/UserShape';
import toDoData from '../../../helpers/data/toDoData';
import PriorityCard from '../../shared/PriorityCard/PriorityCard';
import ToDoCard from '../../shared/ToDoCard/ToDoCard';
import TaggedCard from '../../shared/TaggedCard/TaggedCard';
import ToDoModal from '../../shared/ToDoModal/ToDoModal';
import TagModal from '../../shared/TagModal/TagModal';

class Home extends React.Component {
  state = {
    priorities: [],
    toDos: [],
    tags: [],
    toDoModalIsOpen: false,
    tagModalIsOpen: false,
    fromPriority: false,
    editMode: false,
    toEdit: {},
    toTag: {},
  }

  static propTypes = {
    user: UserShape.userShape,
  }

  componentDidMount() {
    const { user } = this.props;
    this.getUserToDoAndPriorities(user.id);
    this.getUserTaggedToDos(user.id);
  }

  getUserToDoAndPriorities = (userId) => {
    toDoData.getUserPriorities(userId)
      .then((results) => this.setState({ priorities: results.data }))
      .catch(() => {
        this.setState({ priorities: [] });
      });
    toDoData.getUserToDos(userId)
      .then((toDoResults) => this.setState({ toDos: toDoResults.data }))
      .catch(() => {
        this.setState({ toDos: [] });
      });
  }

  getUserTaggedToDos = (userId) => {
    toDoData.getUserTags(userId)
      .then((tagResults) => this.setState({ tags: tagResults.data }))
      .catch(() => {
        this.setState({ tags: [] });
      });
  }

  removeTag = (tagToRemove) => {
    const { user } = this.props;
    toDoData.removeTag(tagToRemove)
      .then(() => this.getUserTaggedToDos(user.id))
      .catch((errorFromRemoveTag) => console.error(errorFromRemoveTag));
  }

  toggleToDoModal = () => {
    this.setState({ toDoModalIsOpen: !this.state.toDoModalIsOpen });
  }

  toggleTagModal = () => {
    this.setState({ tagModalIsOpen: !this.state.tagModalIsOpen });
  }

  setFromPriority = (status) => {
    this.setState({ fromPriority: status });
  }

  setEditMode = (status, toEdit) => {
    this.setState({ editMode: status });
    this.setState({ toEdit });
  }

  setToTag = (toTag) => {
    this.setState({ toTag });
  }

  render() {
    const {
      priorities,
      toDos,
      tags,
      toDoModalIsOpen,
      tagModalIsOpen,
      fromPriority,
      editMode,
      toEdit,
      toTag,
    } = this.state;
    const { user } = this.props;
    const today = new Date();

    return (
      <div className='Home'>
        <div className="personalToDos d-flex justify-content-around flex-wrap mt-3">
          <h2 className='todaysDate text-left col-sm-7'><Moment format='dddd, LL'>{today}</Moment></h2>
          <div className='userDetails col-sm-4 offset-sm-1 d-flex justify-content-end'>
            <div className='userNameTitle text-right'>
              <h4>{`${user.firstName} ${user.lastName}`}</h4>
              <h6>{user.title}</h6>
            </div>
            <img className='profilePhoto' src={user.imageUrl} alt={user.name} />
          </div>
          <div className='col-lg-6'>
            <div className='dashboardCards col-12'>
              <PriorityCard priorities={priorities} toggleToDoModal={this.toggleToDoModal} setFromPriority={this.setFromPriority} setToTag={this.setToTag}
                toggleTagModal={this.toggleTagModal} fromPriority={fromPriority} setEditMode={this.setEditMode} updateToDos={this.getUserToDoAndPriorities} userId={user.id} />
            </div>
            <div className='dashboardCards col-12 mt-3 mb-3'>
              <TaggedCard tags={tags} removeTag={this.removeTag}></TaggedCard>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='dashboardCards col-12'>
              <ToDoCard toDos={toDos} toggleToDoModal={this.toggleToDoModal} setFromPriority={this.setFromPriority} setToTag={this.setToTag} toggleTagModal={this.toggleTagModal}
                setEditMode={this.setEditMode} updateToDos={this.getUserToDoAndPriorities} userId={user.id} />
              </div>
          </div>
        </div>
        <ToDoModal toDoModalIsOpen={toDoModalIsOpen} fromPriority={fromPriority} toEdit={toEdit} setEditMode={this.setEditMode} setFromPriority={this.setFromPriority}
          editMode={editMode} toggleToDoModal={this.toggleToDoModal} updateToDos={this.getUserToDoAndPriorities} userId={user.id} />
        <TagModal tagModalIsOpen={tagModalIsOpen} toggleTagModal={this.toggleTagModal} toTag={toTag} setToTag={this.setToTag} updateToDos={this.getUserToDoAndPriorities}
          owner={user} fromPriority={fromPriority} />
      </div>
    );
  }
}

export default Home;
