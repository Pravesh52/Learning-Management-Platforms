import React, { useState, useEffect } from "react";
import "./StatsCounter.css";
import { statsData } from "../../data/statsData";

const StatsCounter = () => {
  const [counters, setCounters] = useState(statsData.map(() => 0));

  useEffect(() => {
    const targets = statsData.map((s) => parseInt(s.number.replace(/\D/g, "")) || 0);
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setCounters(targets.map((t) => Math.floor((t / steps) * currentStep)));
      if (currentStep >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="stats-section">
      <div className="stats-container">
        {statsData.map((stat, index) => (
          <div className="stat-box" key={index}>
            <h2>
              {counters[index]}
              {stat.number.includes("+") ? "+" : ""}
            </h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;