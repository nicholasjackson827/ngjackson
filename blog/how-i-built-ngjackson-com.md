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

The site is built from scratch with CSS grid as the layout. I use nothing but Bootstrap at work, so it was tempting to pull that in, but to keep the site fast and simple, I decided to write my own CSS from scratch. 

For those who haven't used it, CSS grid is the newest way to build your website layout. If you inspect my homepage, you'll see that I use CSS grid in 5 different places, just for a simple layout (entire page wrapper, 2 places in the header, post previews, and the date objects). 

Everything else about the design is pretty standard CSS with nothing too special. I eventually have hopes to add some slick page transitions, but that's for another day. 

## Deployment

This is probably my favorite part of my website. It's so incredibly slick, mostly thanks to Git and [Netlify](https://www.netlify.com/) where my site is hosted. Their slogan is "Write frontend code. Push it. We handle the rest." and that could not be more accurate. 

### Design Changes

Here's my workflow for making a basic design change:

1. Make sure I'm not on `master` locally (if I want to review the changes before they get published, otherwise I can just commit to `master`).
2. Make some changes on a branch and commit.
3. Push that branch to GitHub.
4. Open up a pull request for that branch (if I didn't have one already).
5. Netlify **automatically** recognizes my PR and starts a staging build from the branch. 
6. Once Netlify builds my site in staging, I get a link to preview it posted to the PR in GitHub. 
7. If I feel good about how it looks, I have 2 options: merge the PR with master _or_ go to my app in Netlify and click "Publish".

It may look like a lot of steps, but that's if I want to preview the changes before they get deployed. If I am just fixing a typo or something, I can just make a change on `master`, commit it, and push it and Netlify takes care of the rest. 

### Publishing New Content

As I mentioned in the content section, Netlify CMS (how I write my posts) integrates with my Git workflow and allows me to write `.md` files and publish them without touching any code. 

Since I'm still working out bugs in the design, I want to be able to preview what my new posts look like before I push them live. Netlify CMS offers something called the "editorial workflow" which you can enable/disable at your will. [The documentation](https://github.com/utlib/netlify-cms-test/blob/master/docs/editorial-workflow.md) does a great job of describing it, but it allows you to save your new post without publishing it. What this means in Git terms is that it will commit the post to a new branch and open a pull request on that branch. 

"But wait!" you may ask. "Doesn't Netlify **automatically** build a preview for you whenever you open a pull request??" Yes! Yes they do. That means that whenever you click "Save Draft," you will be able to preview the new post on a preview instance of your site, all thanks to Netlify. 

Then, once you're happy with your post, you can approve and publish the draft which merges the pull request into `master` and deletes your branch at which point Netlify pulls your new post and adds it to your production site.

That's a 30,000 foot view of how my website is built and works. If you have any questions, leave a comment below and I'll be sure to answer! Also feel free to let me know if you have any requests for me to write about. 
