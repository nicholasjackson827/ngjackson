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

  return (
    <div className="full-post">
      <h1>{post.frontmatter.title}</h1>
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
      }
    }
  }
`