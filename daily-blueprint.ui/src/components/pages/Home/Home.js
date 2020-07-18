import './Home.scss';
import React from 'react';
import UserShape from '../../../helpers/propz/UserShape';
import toDoData from '../../../helpers/data/toDoData';
import PriorityCard from '../../shared/PriorityCard/PriorityCard';
import ToDoCard from '../../shared/ToDoCard/ToDoCard';
import TaggedCard from '../../shared/TaggedCard/TaggedCard';

class Home extends React.Component {
  state = {
    priorities: [],
    toDos: [],
    tags: [],
  }

  static propTypes = {
    user: UserShape.userShape,
  }

  componentDidMount() {
    const { user } = this.props;
    toDoData.getUserPriorities(user.id)
      .then((results) => this.setState({ priorities: results.data }))
      .catch((ErrorFromHomeGetPriorities) => console.error(ErrorFromHomeGetPriorities));
    toDoData.getUserToDos(user.id)
      .then((toDoResults) => this.setState({ toDos: toDoResults.data }))
      .catch((ErrorFromHomeGetTodos) => console.error(ErrorFromHomeGetTodos));
    toDoData.getUserTags(user.id)
      .then((tagResults) => this.setState({ tags: tagResults.data }))
      .catch((ErrorFromHomeGetTags) => console.error(ErrorFromHomeGetTags));
  }

  render() {
    const { priorities, toDos, tags } = this.state;
    const { user } = this.props;
    const today = Date.now();

    return (
      <div className='Home'>
        <h1>{today}</h1>
        <div className="personalToDos d-flex justify-content-around flex-wrap">
          <div className='col-sm-6 m-1'>
            <div className='dashboardCards col-12'>
              <PriorityCard priorities={priorities} />
            </div>
            <div className='dashboardCards col-12 mt-3'>
              <TaggedCard tags={tags}></TaggedCard>
            </div>
          </div>
          <div className='dashboardCards col-sm-5 m-1'>
            <ToDoCard toDos={toDos} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
