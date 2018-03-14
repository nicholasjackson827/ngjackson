import React from 'react';
import Helmet from 'react-helmet';
import DOMPurify from 'dompurify';
import './post.styl'

export default function Template({data}) {
  const {markdownRemark: post} = data;

  const sanitizedHtml = typeof(DOMPurify) == 'undefined' ?
    post.html : DOMPurify.sanitize(post.html);

  return (
    <div className="full-post">
      <h1>{post.frontmatter.title}</h1>
      <div className="body" dangerouslySetInnerHTML={{__html: sanitizedHtml}} />
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
      }
    }
  }
`