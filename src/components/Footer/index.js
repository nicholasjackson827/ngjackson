import React from 'react'
import Link from 'gatsby-link'

const Footer = () => (
  <footer style={{ textAlign: 'center' }}>
    <Link 
      to="/admin/"
      target="_blank"
      style={{
        color: 'goldenrod',
        textDecoration: 'underline',
        textAlign: 'center'
      }}
    >
      Site Admin Page
    </Link>
  </footer>
)

export default Footer