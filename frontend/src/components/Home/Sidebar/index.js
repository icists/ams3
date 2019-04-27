import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

export class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="row">
        <Link className="sidebar-sel" to={ROUTES.HOME}>
        <button type="button" class="btn btn-light sidebar-btn text-uppercase">Prograsdsadam</button>
        </Link>
        </div>
        <div className="row">
        <Link className="sidebar-sel" to={ROUTES.HOME}>
        <button type="button" class="btn btn-light sidebar-btn text-uppercase">speaker</button>
        </Link>
        </div>
        <div className="row">Progasdsadasdram</div>
        <div className="row">Program</div>
      </div>
    )
  }
}

export default Sidebar
