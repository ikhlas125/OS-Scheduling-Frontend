import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FCFS.css";

const PriorityNon = () => {
  const navigate = useNavigate();
  const [processes, setProcesses] = useState([
    { id: "P1", arrivalTime: 0, burstTime: 0, priority: 0 },
  ]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addProcess = () => {
    setProcesses([
      ...processes,
      {
        id: `P${processes.length + 1}`,
        arrivalTime: 0,
        burstTime: 1,
        priority: 0,
      },
    ]);
  };

  const removeProcess = (index) => {
    const newProcesses = [...processes];
    newProcesses.splice(index, 1);
    setProcesses(newProcesses);
  };

  const updateProcess = (index, field, value) => {
    const newProcesses = [...processes];
    newProcesses[index][field] = field === "id" ? value : parseInt(value, 10);
    setProcesses(newProcesses);
  };

  const simulatePriority = async () => {
    setLoading(true);
    setError("");
    setResults(null);

    try {
      //   // Sort processes by arrival time before sending
      //   const sortedProcesses = [...processes].sort(
      //     (a, b) => a.arrivalTime - b.arrivalTime
      //   );

      const response = await fetch("http://localhost:5000/api/schedule/prior", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processes),
      });

      if (!response.ok) throw new Error("Simulation failed");

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fcfs-container">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back to Algorithms
      </button>

      <div className="header">
        <h1>Priority Preemprive Scheduling</h1>
        <p>Processes are executed based on priority with preemption.</p>
      </div>

      <div className="input-section">
        <h2 className="section-title">
          <span>📋</span> Process Input
        </h2>

        <table className="process-table">
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Arrival Time</th>
              <th>Burst Time</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={process.id}
                    onChange={(e) => updateProcess(index, "id", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={process.arrivalTime}
                    onChange={(e) =>
                      updateProcess(index, "arrivalTime", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={process.burstTime}
                    onChange={(e) =>
                      updateProcess(index, "burstTime", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={process.priority}
                    onChange={(e) =>
                      updateProcess(index, "priority", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => removeProcess(index)}
                    disabled={processes.length <= 1}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="controls">
          <button className="secondary-btn" onClick={addProcess}>
            + Add Process
          </button>
          <button
            className="primary-btn"
            onClick={simulatePriority}
            disabled={loading || processes.length === 0}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Running Simulation...
              </>
            ) : (
              "Run Priority Preemptive Simulation"
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {results && (
        <div className="results-section">
          <h2 className="section-title">
            <span>📊</span> Simulation Results
          </h2>

          <div className="metrics">
            <div className="metric-card">
              <div className="metric-value">
                {results.averageTAT.toFixed(2)}
              </div>
              <div className="metric-label">Avg Turnaround Time</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{results.averageWT.toFixed(2)}</div>
              <div className="metric-label">Avg Waiting Time</div>
            </div>
          </div>

          <div className="gantt-container">
            <h3>Gantt Chart</h3>
            <div className="gantt-chart">
              {results.ganttChart.map((entry, index) => (
                <div
                  key={index}
                  className="gantt-bar"
                  style={{ width: `${(entry.end - entry.start) * 30 + 60}px` }}
                >
                  <div className="bar-label">{entry.id}</div>
                  <div className="time-label">
                    {entry.start} - {entry.end}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h3>Process Details</h3>
          <table className="results-table">
            <thead>
              <tr>
                <th>Process</th>
                <th>Arrival</th>
                <th>Burst</th>
                <th>Completion</th>
                <th>Turnaround</th>
                <th>Waiting</th>
              </tr>
            </thead>
            <tbody>
              {results.processes.map((process, index) => (
                <tr key={index}>
                  <td>{process.id}</td>
                  <td>{process.arrivalTime}</td>
                  <td>{process.burstTime}</td>
                  <td>{process.completionTime}</td>
                  <td>{process.turnAroundtime}</td>
                  <td>{process.waitingTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PriorityNon;
