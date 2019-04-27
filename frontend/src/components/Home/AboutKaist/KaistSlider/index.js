import React, { Component } from 'react'
import img1 from '../../../../assets/img/kaist1.jpg'
import img2 from '../../../../assets/img/kaist2.jpg'

export class KaistSlider extends Component {
  render() {
    return (
      <div className="kaist-slider">
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
            <img className="d-block w-100" src={img1} alt="First slide" />
            </div>
            <div className="carousel-item">
            <img className="d-block w-100" src={img2} alt="Second slide" />
            </div>
        </div>
        </div>
      </div>
    )
  }
}

export default KaistSlider
