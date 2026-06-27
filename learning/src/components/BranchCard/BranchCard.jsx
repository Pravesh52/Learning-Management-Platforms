import React from "react";
import "./BranchCard.css";

const BranchCard = ({ branch }) => {
  return (
    <div className="branch-card-component">
      <div className="branch-card-icon">📍</div>
      <div className="branch-card-info">
        <h3>{branch.name}</h3>
        <p className="branch-card-state">
          {branch.city}, {branch.state}
        </p>
        <p className="branch-card-address">{branch.address}</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${branch.lat},${branch.lng}`}
          target="_blank"
          rel="noreferrer"
          className="branch-card-directions-btn"
        >
          Get Directions →
        </a>
      </div>
    </div>
  );
};

export default BranchCard;