import React from 'react';

import { graphql, Link } from 'gatsby';

import BlogPost from '../components/BlogPost';
import Layout from '../components/Layout';

import styles from './blog-list.module.css';

export default function BlogListTemplate({ data, pageContext }) {
  // Calculate the page state so we know if we're on the
  // first or last page.
  const isFirstPage = pageContext.currentPage === 1;
  const isLastPage = pageContext.currentPage === pageContext.numPages;

  // Generate the previous and next page URLs.
  const previousPage = pageContext.currentPage === 2 ?
    '/blog' :
    `/blog/${pageContext.currentPage - 1}`;
  const nextPage = `/blog/${pageContext.currentPage + 1}`;

  return (
    <Layout>
      <div id={styles.hero}>
        <h1>The Coffee Blog</h1>
      </div>
      <main className={styles.blogList}>
        {data.allMarkdownRemark.edges.map(node => (
          <BlogPost
            key={node.node.id}
            slug={node.node.fields.slug}
            title={node.node.frontmatter.title}
            date={node.node.frontmatter.date}
            excerpt={node.node.excerpt} />
        ))}
      </main>

      <div id={styles.pageLinks}>
        {!isFirstPage && (
          <Link to={previousPage}>
            &lt;&lt; Previous Page
          </Link>
        )}

        {!isLastPage && (
          <Link to={nextPage}>
            Next Page &gt;&gt;
          </Link>
        )}
      </div>
    </Layout>
  )
}

// The page query.
export const query = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
