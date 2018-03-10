import React from 'react'
import Link from 'gatsby-link'

export const indexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 10, 
      sort: {fields: [frontmatter___date], order: DESC}) 
    {
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
    <div>
      <h2>Index</h2>

      {data.allMarkdownRemark.edges.map((post, i) => {
        const postDate = new Date(post.node.frontmatter.date);
        const locale = navigator.language;
        const postMonth = postDate.toLocaleString(locale, {month: "long"});
        const postDay = postDate.toLocaleString(locale, {day: "2-digit"});
        const postYear = postDate.toLocaleString(locale, {year: "numeric"});
        return (
        <div className="post">
          <div className="post-top-row">
            <div className="post-date">
              <span className="post-month">{postMonth}</span>
              <span className="post-day">{postDay}</span>
              <span className="post-year">{postYear}</span>
            </div>
            <h3 className="post-title">
              <Link
                key={post.node.id}
                to={post.node.frontmatter.path}>
                {post.node.frontmatter.title}
              </Link>
            </h3>
          </div>
          <p className="post-preview">
            {post.node.excerpt}
          </p>
          <div className="post-tags">
            {post.node.frontmatter.tags &&
             post.node.frontmatter.tags.map(tag => (
              <span className="tag">{tag}</span>
            ))}
          </div>
          {i != numArticles - 1 &&
            <div className="post-connector"></div>
          }
        <hr/>
        </div>
      )})}
      
    </div>
  );
}