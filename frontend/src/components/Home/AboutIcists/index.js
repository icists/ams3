import React, { Component } from 'react'

export class AboutIcists extends Component {
  render() {
    return (
      <div>
        <div id="about-icists">
        <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
            <h2 className="font-weight-bold" style={{marginBottom:'10px'}}>International Conference for</h2>
            <h2 className="font-weight-bold">the Integration of Science, Technology and Society</h2>
            <div className="topic">
            <p>Global conference with 300 participants from 20 countries and 60 universities</p>
            <p>Networking in the fields of science, arts, and humanities</p>
            <p>Five-day festival with world-leading experts and college students</p>
            </div>
            </div>
            <div className="col-lg-2"></div>
        </div>
        </div>
      </div>
    )
  }
}

export default AboutIcists
