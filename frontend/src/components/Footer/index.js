import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return(
        <section id="footer">
            <div className="container text-center">
                <p>N13-1, KAIST 291 DAEHAK-RO, YUSEONG-GU, DAEJEON, KOREA</p>
                <p className="contact-info"><a href="https://www.icists.org/contact-us">Contact Us :</a>  <a href="mailto:help@icists.org">Mail</a>  <a href="https://www.facebook.com/ICISTSKAIST/">Facebook</a>  <a href="https://www.instagram.com/icistskaist/">Instagram</a></p>
                <p>Copyright @ 2019 <a href="https://github.com/icists/ams3" target="_blank">Div. Tech & Design</a></p>
            </div>
        </section>
    )
}

export default Footer