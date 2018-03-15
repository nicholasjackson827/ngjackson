import React from 'react';
import Helmet from 'react-helmet';
import DOMPurify from 'dompurify';
import './post.styl'

export default function Template({data}) {
  const {markdownRemark: post} = data;

  const sanitizedHtml = typeof(DOMPurify.sanitize) == 'undefined' ?
    post.html : DOMPurify.sanitize(post.html);

  return (
    <div className="full-post">
      <h1>{post.frontmatter.title}</h1>
      <div className="body"> 
        <div className="content" dangerouslySetInnerHTML={{__html: sanitizedHtml}} />
        {post.frontmatter.tags.length  &&
         post.frontmatter.tags.map(tag => (
          <span className="tag">{tag}</span>
        ))}
       </div>
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
      }
    }
  }
`