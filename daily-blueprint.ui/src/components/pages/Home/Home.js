import './Home.scss';
import React from 'react';
import UserShape from '../../../helpers/propz/UserShape';
import toDoData from '../../../helpers/data/toDoData';
import PriorityCard from '../../shared/PriorityCard/PriorityCard';
import ToDoCard from '../../shared/ToDoCard/ToDoCard';

class Home extends React.Component {
  state = {
    priorities: [],
    toDos: [],
  }

  static propTypes = {
    user: UserShape.userShape,
  }

  componentDidMount() {
    const { user } = this.props;
    toDoData.getUserPriorities(user.id)
      .then((results) => {
        this.setState({ priorities: results.data });
        toDoData.getUserToDos(user.id)
          .then((toDoResults) => this.setState({ toDos: toDoResults.data }));
      }).catch((ErrorFromHomeComponentDidMount) => console.error(ErrorFromHomeComponentDidMount));
  }

  render() {
    const { priorities, toDos } = this.state;
    const { user } = this.props;

    return (
      <div className='Home'>
        <h1>Home</h1>
        <div className="personalToDos d-flex justify-content-around">
          <div className='dashboardCards col-sm-6 m-1'>
            <PriorityCard priorities={priorities} />
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
