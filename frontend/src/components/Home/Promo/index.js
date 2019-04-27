import React, { Component } from 'react'

export class Promo extends Component {
  render() {
    return (
        <div className="row">
            <section id="promo">
            <div class="container">
                <p>Welcome ICISTS!</p>
                <a href="#apply" class="btn btn-primary" style={{marginRight: '20px'}}>Application</a>
                <a href="#contact" class="btn btn-primary">Contact Us</a>
            </div>
            </section>
        </div>
    )
  }
}

export default Promo
