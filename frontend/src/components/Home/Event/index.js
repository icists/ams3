import React, { Component } from 'react'
import { CupHolderEventImage } from "../../../assets/img/cupholder";
import cupholderevent from '../../../assets/img/cupholder/cupholder-event-how-to-apply.jpg'


export class Event extends Component {
  render() {
    return (
      <div id="cup-event" className="container">
        <div className="row">
          <div className="col">
            <img src={CupHolderEventImage}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Event
