import React from 'react';
import Helmet from 'react-helmet';
import DOMPurify from 'dompurify';
import './post.styl'

export default function Template({data}) {
  const {markdownRemark: post} = data;

  console.log(DOMPurify.sanitize('<script>alert("hi");</script><p>hello</p>'));
  console.log('Hi!');

  const sanitizedHtml = DOMPurify.sanitize(post.html);
  console.log(sanitizedHtml);

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