"use client";
import { useState, useEffect, useRef } from "react";
import { BANNED_CATEGORIES, BANNED_TERMS } from "./lib/bannedTerms";

const INTERVENTION_TASKS = [
  "written the first line of boilerplate code for your project",
  "taken a 3-minute screen break to reset your dopamine baselines",
  "cleared the distracting trash off your physical workspace",
  "opened the documentation you've been avoiding for weeks",
  "committed your current working branch to GitHub",
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [filters, setFilters] = useState(["shorts", "entertainment"]);
  const [newFilter, setNewFilter] = useState("");

  // UI States
  const [showModal, setShowModal] = useState(false);
  const [filtersActive, setFiltersActive] = useState(true);
  const [unlocking, setUnlocking] = useState(false);

  // Cage Mechanics
  const [trackTime, setTrackTime] = useState(180);
  const [boxPos, setBoxPos] = useState({ x: 50, y: 50 });
  const [boxSize, setBoxSize] = useState(40); // Dynamic bounding box metric
  const [currentTask, setCurrentTask] = useState(INTERVENTION_TASKS[0]);
  const [botInsult, setBotInsult] = useState("");

  const isInside = useRef(false);
  const lastMouseData = useRef({ x: 0, y: 0, time: Date.now() });

  const search = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/videos?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setVideos(data);
  };

  const visibleBlockedTerms = [...new Set([...BANNED_TERMS, ...filters])];
  const categoryLabels = {
    "20": "Gaming",
    "23": "Comedy",
    "24": "Entertainment",
  };

  const triggerAddFilter = (e) => {
    e.preventDefault();
    if (newFilter.trim()) setShowModal(true);
  };

  const confirmAddFilter = () => {
    setFilters([...filters, newFilter.toLowerCase().trim()]);
    setNewFilter("");
    setShowModal(false);
  };

  // The Kinesthetic Cage Engine
  useEffect(() => {
    if (!unlocking || trackTime <= 0) return;

    const moveInterval = setInterval(() => {
      setBoxPos((prev) => ({
        x: Math.min(
          80,
          Math.max(15, prev.x + (Math.random() > 0.5 ? 1 : -1) * 1.5),
        ),
        y: Math.min(
          80,
          Math.max(15, prev.y + (Math.random() > 0.5 ? 1 : -1) * 1.5),
        ),
      }));
      setBoxSize(Math.floor(Math.random() * 25) + 20);
    }, 500);

    const countdownInterval = setInterval(() => {
      if (isInside.current) {
        setTrackTime((p) => p - 1);
      } else {
        setTrackTime(180);
      }
    }, 1000);

    return () => {
      clearInterval(moveInterval);
      clearInterval(countdownInterval);
    };
  }, [unlocking, trackTime]);

  // Anti-Automation Anomaly Interceptor
  const verifyHumanity = (e) => {
    const now = Date.now();
    const dt = now - lastMouseData.current.time;
    if (dt > 0) {
      const dx = e.clientX - lastMouseData.current.x;
      const dy = e.clientY - lastMouseData.current.y;
      const speed = Math.hypot(dx, dy) / dt;

      if (speed < 0.001 && dt > 1000) {
        setTrackTime(180);
        setBotInsult(
          "Cute script. Writing automated overrides just to avoid real work? If you applied that efficiency to your code, you'd have finished this app by now. Close the tab and go back to standard YouTube.",
        );
        setTimeout(() => setBotInsult(""), 5000);
      }
    }
    lastMouseData.current = { x: e.clientX, y: e.clientY, time: now };
  };

  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "monospace",
        maxWidth: "1200px",
        margin: "0 auto",
        background: "#0a0a0a",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <h2>SHIELD STATUS: {filtersActive ? "🛡️ ACTIVE" : "⚠️ BYPASSED"}</h2>

      <div
        style={{
          margin: "1rem 0",
          padding: "0.75rem 1rem",
          background: "#111",
          border: "1px solid #333",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
          Active restrictions
        </div>
        <div>
          <strong>Keywords:</strong> {visibleBlockedTerms.join(", ")}
        </div>
        <div>
          <strong>Categories:</strong>{" "}
          {BANNED_CATEGORIES.map((id) => categoryLabels[id] || id).join(", ")}
        </div>
      </div>

      {/* Irreversible Lock Warnings */}
      {filtersActive && !unlocking && (
        <button
          onClick={() => setUnlocking(true)}
          style={{
            background: "#300",
            color: "#ff5555",
            padding: "0.5rem",
            border: "1px solid #ff5555",
            cursor: "pointer",
          }}
        >
          Deactivate Filters (Warning: Requires 3-Minute Kinesthetic
          Calibration)
        </button>
      )}

      {/* The Dynamic Trapping Window */}
      {unlocking && (
        <div
          style={{
            border: "2px solid red",
            padding: "1rem",
            background: "#111",
            margin: "1rem 0",
          }}
          onMouseMove={verifyHumanity}
        >
          <div style={{ color: "red", fontWeight: "bold" }}>
            ⚠️ TIME REMAINING: {trackTime}s
          </div>
          {botInsult && (
            <div
              style={{
                color: "#ffaa00",
                background: "#220000",
                padding: "0.5rem",
                margin: "0.5rem 0",
                border: "1px solid #ffaa00",
              }}
            >
              {botInsult}
            </div>
          )}

          <blockquote
            style={{
              color: "#aaa",
              fontStyle: "italic",
              borderLeft: "2px solid #ffaa00",
              paddingLeft: "0.5rem",
            }}
          >
            "If you have 3 minutes to chase a shape just to kill your filter,
            you could have {currentTask}."
          </blockquote>

          <div
            style={{
              height: "300px",
              background: "#000",
              position: "relative",
              overflow: "hidden",
              marginTop: "1rem",
              border: "1px solid #333",
            }}
          >
            <div
              onMouseEnter={() => {
                isInside.current = true;
              }}
              onMouseLeave={() => {
                isInside.current = false;
              }}
              style={{
                position: "absolute",
                top: `${boxPos.y}%`,
                left: `${boxPos.x}%`,
                width: `${boxSize}px`,
                height: `${boxSize}px`,
                background: "#00ff00",
                transition: "all 0.85s ease-in-out",
                cursor: "crosshair",
                boxShadow: "0 0 8px #00ff00",
              }}
            />
          </div>
        </div>
      )}

      {/* Add Filter Component with Confirmation Interlock */}
      <form onSubmit={triggerAddFilter} style={{ margin: "1rem 0" }}>
        <input
          type="text"
          value={newFilter}
          onChange={(e) => setNewFilter(e.target.value)}
          placeholder="Add permanent keyword constraint..."
          style={{
            padding: "0.4rem",
            background: "#222",
            border: "1px solid #444",
            color: "#fff",
          }}
        />
        <button
          type="submit"
          style={{ padding: "0.4rem", marginLeft: "0.5rem" }}
        >
          Register Filter
        </button>
      </form>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#111",
              padding: "2rem",
              border: "2px solid red",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <h3>Confirm Restriction Engagement</h3>
            <p>
              Removing this keyword requires passing a 3-minute dynamic
              physiological cage. Are you absolutely certain?
            </p>
            <button
              onClick={confirmAddFilter}
              style={{
                background: "red",
                color: "white",
                padding: "0.5rem 1rem",
                marginRight: "1rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Yes, Lock It In
            </button>
            <button
              onClick={() => setShowModal(false)}
              style={{
                background: "#333",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Execution Core */}
      <form onSubmit={search} style={{ margin: "2rem 0" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Topic to master..."
          style={{
            padding: "0.6rem",
            width: "300px",
            background: "#222",
            border: "1px solid #444",
            color: "#fff",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.6rem 1.2rem",
            marginLeft: "1rem",
            background: "#fff",
            color: "#000",
            border: "none",
            fontWeight: "bold",
          }}
        >
          Fetch Clean Feed
        </button>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {videos.map((v) => (
          <div
            key={v.id.videoId}
            style={{
              border: "1px solid #222",
              padding: "1rem",
              background: "#111",
            }}
          >
            <iframe
              width="100%"
              height="180"
              src={`https://www.youtube.com/embed/${v.id.videoId}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <h4 style={{ fontSize: "0.9rem", margin: "0.5rem 0 0 0" }}>
              {v.snippet.title}
            </h4>
          </div>
        ))}
      </div>
    </main>
  );
}
