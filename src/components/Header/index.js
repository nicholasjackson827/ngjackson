import React from 'react'
import Link from 'gatsby-link'

const Header = () => (
  <div>
    <header>
    <Link to="" className="home">ngjackson</Link>
    <div class="right">
      <Link to="about" activeClassName="active">about</Link>
      <Link to="contact" activeClassName="active">contact</Link>
      <a href="https://twitter.com/NicholasGrant16">twitter</a>
      <a href="https://github.com/nicholasjackson827">github</a>
    </div>
  </header>
  </div>
)

export default Header
