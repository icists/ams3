import React, { Component } from 'react'
import homeimg from '../../assets/img/slide2.jpg'
import Promo from './Promo'

export class Home extends Component {
  render() {
    return (
<div className="home">
<div className="row">
<div className="col-1 home-side">side</div>
<div className="col-11 home-content">
    {/* <img src={homeimg} alt=""/> */}
    <Promo />
</div>
</div>
</div>
    )
  }
}

export default Home
