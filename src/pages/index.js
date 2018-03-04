import React from 'react'
import Link from 'gatsby-link'

export const indexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 10
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
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
      <ul>
      {data.allMarkdownRemark.edges.map(post => (
        <li><Link
          key={post.node.id} 
          href={post.node.frontmatter.path}>
          {post.node.frontmatter.title}
        </Link></li>
      ))}
      </ul>
      
    </div>
  );
}