import React from 'react'
import Link from 'gatsby-link'

export const indexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 10) {
      edges {
        node {
          id
          frontmatter {
            path
            title
          }
        }
      }
    }
  }
`

export default function IndexPage({data}) {
  return (
    <div>
      <h2>Index</h2>

      {data.allMarkdownRemark.edges.map(post => (
        <Link
          key={post.node.id} 
          href={post.node.frontmatter.path}>
          {post.node.frontmatter.title}
        </Link>
      ))}
      
    </div>
  );
}