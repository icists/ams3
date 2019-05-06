import React, { Component } from 'react'
// import homeimg from '../../assets/img/slide2.jpg'
import Sidebar from './Sidebar'
import Promo from './Promo'
import AboutKaist from './AboutKaist'
import Icists2019 from './Icists2019'
import MoreInfo from './MoreInfo'
import Sessions from './Sessions'
import AboutIcists from './AboutIcists'
import Icistsposter from './Icistsposter'
import Event from './Event'

export class Home extends Component {
  render() {
    return (
<div className="home">
<div className="row">
<div className="col-12 home-content">
    <Promo />
    <AboutKaist />
    <AboutIcists />
    <Icistsposter />
    <Icists2019 />
    <MoreInfo />
    <Event />
    {/* <Sessions /> */}
</div>
</div>
</div>
    )
  }
}

export default Home
