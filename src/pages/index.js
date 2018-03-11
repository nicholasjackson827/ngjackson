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

    <h1 className="snazzy-title">Some snazzy title about my website.</h1>
    <div className="posts">
      <h1>Posts</h1>

      {data.allMarkdownRemark.edges.map((post, i) => {
        const postDate = new Date(post.node.frontmatter.date);
        // Use the default 'en-US' language for pre-render since navigator isn't defined yet
        const locale = typeof(navigator.language) == 'undefined' : 'en-US' : naviagtor.language;
        const postMonth = postDate.toLocaleString(locale, {month: "long"});
        const postDay = postDate.toLocaleString(locale, {day: "2-digit"});
        const postYear = postDate.toLocaleString(locale, {year: "numeric"});
        const smallPostDate = postMonth + ' ' + postDay + ' ' + postYear;
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
          <span className="post-date-small">{smallPostDate}</span>
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