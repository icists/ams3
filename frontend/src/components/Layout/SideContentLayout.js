import React, { Component } from 'react'

export class SideContentLayout extends Component {
  render() {
    return (
      // add tag class
      <div> 
        <div className="row">
        <div className="col-1"></div>
        <div className="col-1">
        {/* Add Sidebar Content */}
        </div>
        <div className="col-9">
        {/* Add Contents */}
        </div>
        <div className="col-1"></div>
        </div>
      </div>
    )
  }
}

export default SideContentLayout
