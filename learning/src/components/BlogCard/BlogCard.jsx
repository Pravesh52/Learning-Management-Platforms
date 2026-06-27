import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`} className="blog-card-component">
      <div className="blog-card-date">{blog.date}</div>
      <h3>{blog.title}</h3>
      <p>{blog.excerpt.slice(0, 100)}...</p>
      <span className="blog-card-read-more">Read More →</span>
    </Link>
  );
};

export default BlogCard;