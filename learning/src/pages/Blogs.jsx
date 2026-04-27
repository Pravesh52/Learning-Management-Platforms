import React from "react";
import "../styles/Blogs.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const blogsData = [
  {
    id: 1,
    name: "Shailendra Mishra",
    role: "Chemistry Expert",
    courses: 3,
    students: 3,
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: 2,
    name: "Gyan Prakash Shukla",
    role: "Physics Expert",
    courses: 6,
    students: 5,
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: 3,
    name: "Kamta Mishra",
    role: "Physics Expert",
    courses: 2,
    students: 4,
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: 4,
    name: "Sanjay Chaturvedi",
    role: "Mathematics Expert",
    courses: 5,
    students: 8,
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
];

const Blogs = () => {
  return (
    <section className="blogs">
      
      {/* HEADER */}
      <div className="blogs-header">
        <h4 className="sub-title">TEAM MEMBER ______</h4>
        <h2 className="main-title">
          Our Expert <span>Instructors</span>
        </h2>
      </div>

      {/* CARDS */}
      <div className="blog-container">
        {blogsData.map((item) => (
          <div className="blog-card" key={item.id}>

            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="role">{item.role}</p>

              {/* <div className="stats">
                <span>📚 {item.courses} Courses</span>
                <span>👤 {item.students} Students</span>
              </div> */}

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