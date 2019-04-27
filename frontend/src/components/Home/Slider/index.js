import React, { Component } from 'react'
import slide1 from '../../../assets/img/slide1.jpg'
import slide2 from '../../../assets/img/slide2.jpg'
import slide3 from '../../../assets/img/slide3.jpg'


export class Slider extends Component {
  render() {
    return (
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img src={slide1} class="d-block w-100" alt="slide image" />
            </div>
            <div class="carousel-item">
            <img src={slide2} class="d-block w-100" alt="slide image" />
            </div>
            <div class="carousel-item">
            <img src={slide3} class="d-block w-100" alt="slide image" />
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        </div>
    )
  }
}

export default Slider
