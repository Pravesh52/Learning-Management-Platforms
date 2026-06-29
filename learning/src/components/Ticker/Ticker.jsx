import React from "react";
import "./Ticker.css";

const Ticker = () => {
  const tickerText =
    "🎓 ADMISSION OPEN 2026-27 — JOIN CLIMAX ACADEMY TODAY  •  📞 CALL +91 8319661649  •  🏆 10000+ SUCCESSFUL STUDENTS  •  🎓 ADMISSION OPEN 2026-27 — JOIN CLIMAX ACADEMY TODAY  •  📞 CALL +91 8319661649  •  🏆 10000+ SUCCESSFUL STUDENTS  •  ";

  return (
    <div className="ticker-wrapper">
      <div className="ticker-track">
        <span className="ticker-text">{tickerText}</span>
        <span className="ticker-text">{tickerText}</span>
      </div>
    </div>
  );
};

export default Ticker;