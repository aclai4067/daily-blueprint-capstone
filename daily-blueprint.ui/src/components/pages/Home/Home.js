import './Home.scss';
import React from 'react';
import UserShape from '../../../helpers/propz/UserShape';
import toDoData from '../../../helpers/data/toDoData';
import PriorityCard from '../../shared/PriorityCard/PriorityCard';

class Home extends React.Component {
  state = {
    priorities: [],
  }

  static propTypes = {
    user: UserShape.userShape,
  }

  componentDidMount() {
    const { user } = this.props;
    toDoData.getUserPriorities(user.id)
      .then((results) => this.setState({ priorities: results.data }))
      .catch((ErrorFromHomeComponentDidMount) => console.error(ErrorFromHomeComponentDidMount));
  }

  render() {
    const { priorities } = this.state;
    const { user } = this.props;

    return (
      <div className='Home'>
        <h1>Home</h1>
        <div className="personalToDos d-flex justify-content-around">
          <div className='dashboardCards col-sm-6'>
            <PriorityCard priorities={priorities} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
