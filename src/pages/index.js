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
    <div className="wrapper">
    <div className="posts">
      <h1>Posts</h1>

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
        </div>
      )})}

      

      
    </div>

    <div className="tags-section">
        <h1>Tags!</h1>
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