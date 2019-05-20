import React, { Component } from 'react'
import { CupHolderEventImage } from "../../../assets/img/cupholder";
import cupholderevent from '../../../assets/img/cupholder/cupholder-event-how-to-apply.jpg'


export class Event extends Component {
  render() {
    return (
      <div id="cup-event">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <img style={{width:'100%'}} src={CupHolderEventImage}/>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    )
  }
}

export default Event
