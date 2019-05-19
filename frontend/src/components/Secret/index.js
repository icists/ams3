import React, { Component } from 'react'
import { withFirebase } from '../Firebase';
import { compose } from "recompose";


class SecretBase extends Component {
  constructor(props) {
      super(props);
      console.log(1);
      // this.props.firebase.users()
      //   .once('value').then(snapshot => {
      //     console.log(1);
      //       console.log(snapshot.val());
      //   })
        this.props.firebase
        .users()
        .once('value').then((snapshot) => {
          // this.setState({
          //   ...snapshot.val()
          // })
          // console.log(this.props.firebase.auth.currentUser.uid);
          console.log(snapshot.val());
        })
  }

  render() {
    return (
      <div>
        <h2>gs</h2>
      </div>
    )
  }
}

const Secret = compose(withFirebase)(SecretBase);

export default Secret
