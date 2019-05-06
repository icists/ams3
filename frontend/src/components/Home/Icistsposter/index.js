import React, { Component } from 'react'
import poster from '../../../assets/img/poster.png'

export class icistsposter extends Component {
  render() {
    return (
        <div id="icists-poster">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
          <h2 className="text-uppercase font-weight-bold">About ICISTS 2019</h2>
            <img src={poster} className="poster" alt=""/>
          </div>
          <div className="col-lg-2"></div>
        </div>
        </div>
    )
  }
}

export default icistsposter
