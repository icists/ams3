import React, { Component } from 'react'
import KaistSlider from './KaistSlider';

export class AboutKaist extends Component {
  render() {
    return (
      <div className="about-kaist">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 ">
          <div className="row date text-uppercase"><h2 className="text-center">Date: Jul 29 - aug 02, 2019</h2></div>
          <div className="row venue text-uppercase"><h3>venue: kaist daejeon campus</h3></div>
          <KaistSlider />
          </div>
          <div className="col-md-auto"></div>
        </div>
      </div>
    )
  }
}

export default AboutKaist
