import React from "react";
import "../styles/Blogs.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import expertImg from "../assets/expertimage.png";

const blogsData = [
  {
    id: 1,
    name: "Daniel Miller",
    role: "Logo Expert",
    courses: 3,
    students: 3,
    image: expertImg,
    social: {
      facebook: "https://facebook.com/masum",
      twitter: "https://twitter.com/masum",
      linkedin: "https://linkedin.com/in/masum",
    },
  },
  {
    id: 2,
    name: "Masum Billah",
    role: "Developer",
    courses: 6,
    students: 5,
    image: expertImg,
    social: {
      facebook: "https://facebook.com/masum",
      twitter: "https://twitter.com/masum",
      linkedin: "https://linkedin.com/in/masum",
    },
  },
  {
    id: 3,
    name: "Kenneth Renteria",
    role: "Marketer",
    courses: 0,
    students: 0,
    image: expertImg,
    social: {
      facebook: "https://facebook.com/masum",
      twitter: "https://twitter.com/masum",
      linkedin: "https://linkedin.com/in/masum",
    },
  },
  {
    id: 4,
    name: "Richard Hood",
    role: "UI UX Designer",
    courses: 2,
    students: 0,
    image: expertImg,
    social: {
      facebook: "https://facebook.com/masum",
      twitter: "https://twitter.com/masum",
      linkedin: "https://linkedin.com/in/masum",
    },
  },
];

const Blogs = () => {
  return (
    <section className="blogs">
      <h4 className="sub-title">TEAM MEMBER</h4>
      <h2 className="main-title">
        Our Expert <span>Instructors</span>
      </h2>

      <div className="blog-container">
        {blogsData.map((item) => (
          <div className="blog-card" key={item.id}>
            
            <div className="img-box">
              <img src={item.image} alt="instructor" />
            </div>

            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="role">{item.role}</p>

              <div className="stats">
                <span>📚 {item.courses}</span>
                <span>👤 {item.students}</span>
              </div>

              <div className="socials">
                <a href={item.social.facebook} target="_blank" rel="noreferrer">
                  <FaFacebookF />
                </a>
                <a href={item.social.twitter} target="_blank" rel="noreferrer">
                  <FaTwitter />
                </a>
                <a href={item.social.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;