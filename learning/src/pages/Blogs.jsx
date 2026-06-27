import React from "react";
import "./Blogs.css";
import BlogCard from "../components/BlogCard/BlogCard";
import { blogsData } from "../data/blogsData";

const Blogs = () => {
  return (
    <div className="blogs-page">
      <div className="blogs-page-header">
        <h4 className="sub-title">BLOG POSTS</h4>
        <h2 className="main-title">Latest Updates & Study Tips</h2>
        <p className="page-desc">
          Stay updated with exam preparation tips, study strategies, and the latest academic
          insights from Climax Academy's expert faculty.
        </p>
      </div>

      <div className="blogs-grid">
        {blogsData.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;