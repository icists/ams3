import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

export class Promo extends Component {
  render() {
    return (
      <section id="promo">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
          <div>
                <p className="font-weight-bold">Welcome ICISTS!</p>
                <Link to={ROUTES.APPLICATION} style={{marginRight : '10px'}}><button type="button" class="btn btn-info">Apply</button></Link>
                <Link to={ROUTES.EVENT}><button type="button" class="btn btn-info">Event</button></Link>
          </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </section>
    )
  }
}

export default Promo
