import React from "react";
import "./Branches.css";
import { branchesData } from "../data/branchesData";
import BranchCard from "../components/BranchCard/BranchCard";

const Branches = () => {
  return (
    <div className="branches-page">
      <div className="branches-page-header">
        <h4 className="sub-title">OUR LOCATIONS</h4>
        <h2 className="main-title">Find Climax Academy Near You</h2>
        <p className="page-desc">
          We currently operate 2 branches across Madhya Pradesh, helping thousands of students
          achieve academic excellence every year.
        </p>
      </div>

      <div className="branches-content">
        {/* MAP SECTION */}
        <div className="branches-map-wrapper">
          <iframe
            title="Climax Academy Locations Map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d234567.0!2d81.3037!3d24.5362!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDMyJzEwLjMiTiA4McKwMTgnMTMuMyJF!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* BRANCH CARDS */}
        <div className="branches-cards-wrapper">
          {branchesData.map((branch) => (
            <BranchCard branch={branch} key={branch.id} />
          ))}

          <div className="branch-contact-card">
            <h3>Need More Information?</h3>
            <p>📞 +91 8319661649</p>
            <p>📧 Pravesht252@gmail.com</p>
            <a href="/contact-us" className="branch-contact-btn">
              Contact Us →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branches;