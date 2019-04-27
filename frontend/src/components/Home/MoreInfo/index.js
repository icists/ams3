import React, { Component } from 'react'
import timetable from '../../../assets/img/timetable.png'

export class MoreInfo extends Component {
  render() {
    return (
      <div className="more-info">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
            <div className="row title text-uppercase"><h2>Timetable</h2></div>
            <img src={timetable} alt="timetable"/>
        </div>
        <div className="col-md-auto"></div>
      </div>
      </div>
    )
  }
}

export default MoreInfo
