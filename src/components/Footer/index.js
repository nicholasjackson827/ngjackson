import React from 'react'
import Link from 'gatsby-link'

const Footer = () => (
  <footer>
    <Link 
      to="/admin/"
      target="_blank"
      style={{
        color: 'rebeccapurple',
        textDecoration: 'none'
      }}
    >
      Site Admin Page
    </Link>
  </footer>
)

export default Footer