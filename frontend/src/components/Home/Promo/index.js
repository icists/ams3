import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

export class Promo extends Component {
  render() {
    return (
        <div className="row">
            <section id="promo">
            <div>
                <p className="font-weight-bold">Welcome ICISTS!</p>
                <Link to={ROUTES.APPLICATION} style={{marginRight : '10px'}}><button type="button" class="btn btn-info">Applicaion</button></Link>
                <Link to={ROUTES.EVENT}><button type="button" class="btn btn-info">Event</button></Link>
            </div>
            </section>
        </div>
    )
  }
}

export default Promo
