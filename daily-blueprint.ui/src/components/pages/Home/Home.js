import './Home.scss';
import React from 'react';
import Moment from 'react-moment';
import UserShape from '../../../helpers/propz/UserShape';
import toDoData from '../../../helpers/data/toDoData';
import PriorityCard from '../../shared/PriorityCard/PriorityCard';
import ToDoCard from '../../shared/ToDoCard/ToDoCard';
import TaggedCard from '../../shared/TaggedCard/TaggedCard';
import ToDoModal from '../../shared/ToDoModal/ToDoModal';

class Home extends React.Component {
  state = {
    priorities: [],
    toDos: [],
    tags: [],
    toDoModalIsOpen: false,
    fromPriority: false,
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
      .catch((ErrorFromHomeGetPriorities) => console.error(ErrorFromHomeGetPriorities));
    toDoData.getUserToDos(userId)
      .then((toDoResults) => this.setState({ toDos: toDoResults.data }))
      .catch((ErrorFromHomeGetTodos) => console.error(ErrorFromHomeGetTodos));
  }

  getUserTaggedToDos = (userId) => {
    toDoData.getUserTags(userId)
      .then((tagResults) => this.setState({ tags: tagResults.data }))
      .catch((ErrorFromHomeGetTags) => console.error(ErrorFromHomeGetTags));
  }

  toggleToDoModal = () => {
    this.setState({ toDoModalIsOpen: !this.state.toDoModalIsOpen });
  }

  setFromPriority = (status) => {
    this.setState({ fromPriority: status });
  }

  render() {
    const {
      priorities,
      toDos,
      tags,
      toDoModalIsOpen,
      fromPriority,
    } = this.state;
    const { user } = this.props;
    const today = new Date();

    return (
      <div className='Home'>
        <div className="personalToDos d-flex justify-content-around flex-wrap">
          <h2 className='todaysDate text-left col-sm-7'><Moment format='LLLL'>{today}</Moment></h2>
          <div className='userDetails col-sm-4 offset-sm-1 d-flex justify-content-end'>
            <div className='userNameTitle text-right'>
              <h4>{`${user.firstName} ${user.lastName}`}</h4>
              <h6>{user.title}</h6>
            </div>
            <img className='profilePhoto' src={user.imageUrl} alt={user.name} />
          </div>
          <div className='col-sm-6 m-1'>
            <div className='dashboardCards col-12'>
              <PriorityCard priorities={priorities} toggleToDoModal={this.toggleToDoModal} setFromPriority={this.setFromPriority} />
            </div>
            <div className='dashboardCards col-12 mt-3'>
              <TaggedCard tags={tags}></TaggedCard>
            </div>
          </div>
          <div className='dashboardCards col-sm-5 m-1'>
            <ToDoCard toDos={toDos} toggleToDoModal={this.toggleToDoModal} setFromPriority={this.setFromPriority} />
          </div>
        </div>
        <ToDoModal toDoModalIsOpen={toDoModalIsOpen} fromPriority={fromPriority} toggleToDoModal={this.toggleToDoModal} updateToDos={this.getUserToDoAndPriorities} userId={user.id} ></ToDoModal>
      </div>
    );
  }
}

export default Home;
