import React from 'react'
import Link from 'gatsby-link'
import PostExcerpt from '../components/PostExcerpt'

export const indexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 10, 
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            title
            date
            tags
          }
        }
      }
    }
  }
`

export default function IndexPage({data}) {
  const numArticles = data.allMarkdownRemark.edges.length;
  console.log(numArticles);

  return (
    <div className="index">

    <h1 className="snazzy-title">Some snazzy title about my website.</h1>
    <div className="post-overviews">
      <h1>Posts</h1>
      {data.allMarkdownRemark.edges.map((post, i) => (
        <PostExcerpt post={post} lastPost={i == numArticles - 1} />
      ))}
    </div>

    <div className="tags-section">
        <h1>Tags</h1>
      <div className="tags">
      <span className="tag">GraphQL</span>
      <span className="tag">Okta</span>
      <span className="tag">Samanage</span>
      <span className="tag">Stylus</span>
      <span className="tag">Challenge</span>
      <span className="tag">GitHub</span>
      <span className="tag">OSS</span>
      <span className="tag">Test Tag</span>
      <span className="tag">Out of Ideas</span>
      <span className="tag">Short</span>
      </div></div>

      </div>
  );
}