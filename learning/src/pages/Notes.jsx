import React, { useEffect, useState } from "react";
import "./Notes.css";
import ProductCard from "../components/ProductCard/ProductCard";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classFilter, setClassFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/notes/public`);
      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Notes fetch error:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const classOptions = ["All", ...new Set(notes.map((n) => n.className).filter(Boolean))];
  const subjectOptions = ["All", ...new Set(notes.map((n) => n.subject).filter(Boolean))];

  const filteredNotes = notes.filter((n) => {
    const classMatch = classFilter === "All" || n.className === classFilter;
    const subjectMatch = subjectFilter === "All" || n.subject === subjectFilter;
    return classMatch && subjectMatch;
  });

  return (
    <div className="notes-page">
      <div className="notes-page-header">
        <h4 className="sub-title">CLIMAX ACADEMY'S PERFECT NOTES</h4>
        <h2 className="main-title">Shop Study Notes & Books</h2>
        <p className="page-desc">
          Crafted by top faculty, exam-focused, easy to understand, and trusted by thousands of
          students across Madhya Pradesh.
        </p>
      </div>

      <div className="notes-filter-bar">
        <div className="filter-group">
          <label>Class</label>
          <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
            {classOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Subject</label>
          <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
            {subjectOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="notes-grid">
        {loading ? (
          <p className="notes-loading">Loading notes...</p>
        ) : filteredNotes.length > 0 ? (
          filteredNotes.map((note) => <ProductCard note={note} key={note._id} />)
        ) : (
          <div className="notes-empty-state">
            <h3>No Notes Available Right Now</h3>
            <p>New study materials are added regularly. Please check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;