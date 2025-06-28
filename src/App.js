import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import "./App.css";
import FCFS from "./components/FCFS";
import SJB from "./components/SJB";
import PriorityNON from "./components/PriorityNon";
import Priority from "./components/Priority";
import RR from "./components/RR";
import SRTF from "./components/SRTF";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/fcfs" element={<FCFS />} />
        <Route path="/sjf" element={<SJB />} />
        <Route path="/priority" element={<PriorityNON />} />
        <Route path="/priorityPre" element={<Priority />} />
        <Route path="/round-robin" element={<RR />} />
        <Route path="/srtf" element={<SRTF />} />
      </Routes>
    </Router>
  );
}

function LandingPage() {
  const algorithms = [
    {
      id: "fcfs",
      name: "First-Come, First-Served",
      description:
        "Processes are executed in arrival order. Simple but can lead to convoy effect.",
      color: "#4361ee",
    },
    {
      id: "sjf",
      name: "Shortest Job First",
      description:
        "Executes the process with smallest execution time first. Minimizes waiting time.",
      color: "#06d6a0",
    },
    {
      id: "priority",
      name: "Priority Scheduling Non Preemptive",
      description: "Processes executed based on priority. Is non-preemptive.",
      color: "#ff9e00",
    },
    {
      id: "priorityPre",
      name: "Priority Scheduling Preemptive",
      description: "Processes executed based on priority. Is preemptive.",
      color: "#9f7942",
    },
    {
      id: "round-robin",
      name: "Round Robin",
      description:
        "Each process gets a fixed time slot (quantum). Fair CPU time allocation.",
      color: "#ef476f",
    },
    {
      id: "srtf",
      name: "Shortest Remaining Time First",
      description:
        "Preemptive SJF variant. Chooses process with shortest remaining time.",
      color: "#7209b7",
    },
  ];

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">OS Scheduler</span>
          </div>
          <div className="nav-links">
            <Link
              to="algorithms"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="nav-link"
            >
              Algorithms
            </Link>
            <Link
              to="features"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="nav-link"
            >
              Features
            </Link>
            <Link
              to="footer"
              spy={true}
              smooth={true}
              duration={500}
              className="nav-link"
            >
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero" id="home">
        <div className="hero-content">
          <div className="badge">Interactive Learning Tool</div>
          <h1>Visualize CPU Scheduling Algorithms</h1>
          <p>
            Understand how operating systems manage processes through
            interactive simulations with real-time visualizations and
            performance metrics.
          </p>
          <div className="hero-cta">
            <Link
              to="algorithms"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <button className="cta-button primary">Start Simulation</button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="visualization-preview">
            <div className="gantt-chart">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="gantt-bar"
                  style={{
                    width: `${Math.floor(Math.random() * 60) + 40}px`,
                    backgroundColor: algorithms[i - 1].color,
                  }}
                >
                  <span>P{i}</span>
                </div>
              ))}
            </div>
            <div className="metrics">
              <div className="metric">
                <div className="metric-value">87%</div>
                <div className="metric-label">CPU Utilization</div>
              </div>
              <div className="metric">
                <div className="metric-value">2.3</div>
                <div className="metric-label">Avg Wait Time</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Algorithms Section */}
      <section className="algorithms-section" id="algorithms">
        <div className="section-header">
          <h2>Scheduling Algorithms</h2>
          <p>
            Explore different CPU scheduling strategies used in operating
            systems
          </p>
        </div>
        <div className="algorithms-grid">
          {algorithms.map((algo) => (
            <div
              key={algo.id}
              className="algorithm-card"
              style={{ "--accent-color": algo.color }}
            >
              <div className="card-header">
                <div
                  className="algo-icon"
                  style={{ backgroundColor: `${algo.color}20` }}
                >
                  <span style={{ color: algo.color }}>
                    {algo.id.toUpperCase()}
                  </span>
                </div>
                <h3>{algo.name}</h3>
              </div>
              <p>{algo.description}</p>
              <RouterLink to={`/${algo.id}`}>
                <button
                  className="simulate-button"
                  style={{ backgroundColor: algo.color }}
                >
                  Simulate {algo.name.split(" ")[0]}
                </button>
              </RouterLink>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-header">
          <h2>Powerful Simulation Features</h2>
          <p>Everything you need to understand CPU scheduling mechanics</p>
        </div>
        <div className="features-grid">
          <div className="feature">
            <div
              className="feature-icon"
              style={{ backgroundColor: "#4361ee20", color: "#4361ee" }}
            >
              <span>📈</span>
            </div>
            <h3>Visual Timeline</h3>
            <p>Interactive Gantt charts showing process execution over time</p>
          </div>
          <div className="feature">
            <div
              className="feature-icon"
              style={{ backgroundColor: "#06d6a020", color: "#06d6a0" }}
            >
              <span>🧮</span>
            </div>
            <h3>Performance Metrics</h3>
            <p>
              Real-time calculation of waiting time, turnaround time, and
              throughput
            </p>
          </div>
          <div className="feature">
            <div
              className="feature-icon"
              style={{ backgroundColor: "#ff9e0020", color: "#ff9e00" }}
            >
              <span>⚙️</span>
            </div>
            <h3>Custom Parameters</h3>
            <p>
              Adjust time quantum, priorities, and arrival times for each
              process
            </p>
          </div>
          <div className="feature">
            <div
              className="feature-icon"
              style={{ backgroundColor: "#ef476f20", color: "#ef476f" }}
            >
              <span>📊</span>
            </div>
            <h3>Comparative Analysis</h3>
            <p>Compare performance metrics across different algorithms</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>OS Scheduling Simulator | Educational Tool for Operating Systems</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/documentation">Documentation</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
