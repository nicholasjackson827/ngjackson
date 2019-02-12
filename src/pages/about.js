import React from 'react'
import Link from 'gatsby-link'
import './about.styl'

const About = () => (
  <div className="static-page">
    <h1>About</h1>
    <div className="body">
      <p>My name is Nicholas Jackson. I'm a full time software developer for O'Reilly Auto Parts. There, I do Java development for the eCommerce Operations team.</p>
      <p>I consider myself to be a cutting-edge developer that lives in the enterprise world. I love React, GraphQL, GatsbyJS (which is how this website is wrriten), and Javascript. I get to do very little of that at work (with good reason), so this is my outlet.</p>
      <p>Outside of work, I play video games, learn about anything I find interesting (theology, economics, woodworking, etc.) and love to play the banjo.</p>
      <p>I'm always looking for side jobs, so if you'd be interested in hiring me, please <Link to="contact">visit my contact page!</Link></p>
    </div>
  </div>
)

export default About
