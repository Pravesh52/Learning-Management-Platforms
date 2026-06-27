import React from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogDetail.css";
import { blogsData } from "../data/blogsData";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogsData.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="blog-detail-page">
        <div className="blog-not-found">
          <h2>Blog Post Not Found</h2>
          <Link to="/blogs" className="back-to-blogs-btn">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  // Other blogs to suggest (excluding current)
  const relatedBlogs = blogsData.filter((b) => b.id !== blog.id).slice(0, 2);

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-breadcrumb">
        <Link to="/blogs">Blogs</Link> / <span>{blog.title}</span>
      </div>

      <div className="blog-detail-container">
        <span className="blog-detail-date">{blog.date}</span>
        <h1 className="blog-detail-title">{blog.title}</h1>

        <div className="blog-detail-content">
          <p>{blog.content}</p>
        </div>

        <div className="blog-detail-footer">
          <Link to="/blogs" className="back-to-blogs-btn">
            ← Back to All Blogs
          </Link>
        </div>
      </div>

      {relatedBlogs.length > 0 && (
        <div className="blog-related-section">
          <h3>You May Also Like</h3>
          <div className="blog-related-grid">
            {relatedBlogs.map((b) => (
              <Link to={`/blogs/${b.id}`} className="blog-related-card" key={b.id}>
                <span className="blog-related-date">{b.date}</span>
                <h4>{b.title}</h4>
                <p>{b.excerpt.slice(0, 90)}...</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;