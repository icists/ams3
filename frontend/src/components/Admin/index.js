import React from 'react';
import * as ROLES from '../../constants/roles';
import { withAuthorization } from '../Session';

class AdminPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      loading: false
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObj = snapshot.val();
      const usersList = Object.keys(usersObj).map(key => ({
        ...usersObj[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false
      })
    })
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div className='admin-page'>
        <h1>Admin</h1>
        {loading && <div>Loading...</div>}
        <UserList users={users}/>
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>EMail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
)


const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(AdminPage);