import React from 'react';
import DOMPurify from 'dompurify';
import Tag from '../components/Tag';
import Disqus from 'disqus-react';
import './post.styl'

export default function Template({data}) {
  const {markdownRemark: post} = data;

  const sanitizedHtml = typeof(DOMPurify.sanitize) == 'undefined' ?
    post.html : DOMPurify.sanitize(post.html);

  const disqusShortname = 'ngjackson';
  const disqusConfig = {
    url: 'https://ngjackson.com/' + post.frontmatter.path,
    identifier: post.frontmatter.path,
    title: post.frontmatter.title
  }

  const postDate = new Date(post.frontmatter.date);
  // Use the default 'en-US' language for pre-render since navigator isn't defined yet
  const locale = typeof(navigator) == 'undefined' ? 'en-US' : navigator.language;
  const postMonth = postDate.toLocaleString(locale, {month: "long"});
  const postDay = postDate.toLocaleString(locale, {day: "2-digit"});
  const postYear = postDate.toLocaleString(locale, {year: "numeric"});
  const smallPostDate = postMonth + ' ' + postDay + ' ' + postYear;


  return (
    <div className="full-post">
      <h1>{post.frontmatter.title}</h1>
      <span className="post-date">{smallPostDate}</span>
      <div className="body"> 
        <div className="content" dangerouslySetInnerHTML={{__html: sanitizedHtml}} />
        {post.frontmatter.tags.length  &&
         post.frontmatter.tags.map(tag => (
          <Tag tag={tag} />
        ))}
      </div>
      <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  )
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        tags
        date
      }
    }
  }
`