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
    {/* <Icists2019 /> */}
    <Event />
    <MoreInfo />
    {/* <Sessions /> */}
    {/* <div className="container text-center" style={{background:"#333", color:"white"}}>
      <h2>Contact us for any type of inquiry regarding your application</h2><br />
      <h3>Email: help@icists.org</h3> <br/>
      <h3>Facebook: fb.com/ICISTSKAIST/</h3><br />
    </div> */}
</div>
</div>
</div>
    )
  }
}

export default Home
