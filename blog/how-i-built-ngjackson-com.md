---
path: /how-i-built-my-website
date: 2018-03-17T15:02:10.460Z
title: How I Built ngjackson.com
tags:
  - gatsbyjs
  - graphql
  - web development
  - reactjs
---
After about 2 weeks of development on and off, I'm finally happy with the design of my very first personal website, [ngjackson.com](https://ngjackson.com). This will be a high level overview of how the site is built, designed, and deployed. If you're curious, the source code can be found [here](https://github.com/nicholasjackson827/ngjackson) on GitHub.

## Framework

I knew I wanted to go with a static site generator, but wasn't sure which one to go with. I've built sites in [Jekyll](https://jekyllrb.com/) back when I was heavy into Ruby on Rails, but that was many moons ago. It was nice and simple, but didn't have some of the flexibility that I wanted. 

[Hugo](https://gohugo.io/) was another enticing option since it was built in Go, super fast, and well supported. However, I don't know any Go and while the syntax looks simple, I don't see myself ever using Go for anything else, especially at work. 

Then, I heard about [GatsbyJS](https://www.gatsbyjs.org/) on my favorite web development podcast, [Syntax](https://syntax.fm/), hosted by [Wes Bos](http://wesbos.com/) and [Scott Tolinski](http://scotttolinski.com/). They ranted and raved over it, plus it was built upon ReactJS, a JavaScript framework I'd been itching to learn, and GraphQL, a query language that I believe will replace REST.

By no means is Gatsby a "regular" static site generator. It has more customization and features than any other option I've seen. This, of course, means it has a bit of steep learning curve which I helped curb with [this GatsbyJS tutorial series](https://www.youtube.com/watch?v=b2H7fWhQcdE&list=PLLnpHn493BHHfoINKLELxDch3uJlSapxg) to get me up and running. After those few videos, I felt good enough with the basics and was off to the races after that. 

## Writing Content

I feel good enough to just write my blog posts in markdown, but with my wife wanting a blog soon, I wanted to explore some CMS options. Contentful and Wordpress were both appealing, but [Netlify CMS](https://www.netlifycms.org/) really won me over the most. 

Netlify CMS is an open source CMS that provides a clean GUI to write, edit, and publish different models. It essentially works by integrating into your Git workflow. When you write a new post (or review, or whatever you have configured Netlify CMS to work with), it creates a new `.md` file in your repo on GitHub with the content. I'll explain more how this ends up on the website in the section about deployment. 

## Design

The site is built from scratch with CSS Grid as the layout. I use nothing but Bootstrap at work, so it was tempting to pull that in, but to keep the site fast and simple, I decided to write my own CSS from scratch. 

For those who haven't used it, CSS Grid is the newest way to build your website layout. If you inspect my homepage, 
