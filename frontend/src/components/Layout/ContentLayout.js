import React, { Component } from 'react'

export class ContentLayout extends Component {
  render() {
    return (
      // add tag class
      <div> 
        <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
        {/* Add Contents */}
        </div>
        <div className="col-1"></div>
        </div>
      </div>
    )
  }
}

export default ContentLayout
