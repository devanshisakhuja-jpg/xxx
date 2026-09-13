import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

// Save your own images into src/assets, then uncomment this line
// and delete the "const homeBg = null" line below it.
// import homeBg from "../assets/home-bg.jpg";
const homeBg = null;

const initialTasks = [
  { id: 1, title: "Finish DBMS assignment", deadline: "2026-09-14T18:00", done: false },
  { id: 2, title: "Patrol the neighborhood", deadline: "2026-09-13T20:00", done: false },
  { id: 3, title: "Society fair robot wiring", deadline: "2026-09-20T12:00", done: false },
];

const styles = `
  .home-page {
    min-height: 100vh;
    width: 100%;
    font-family: Arial, Helvetica, sans-serif;
    background-image: url("/download.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .home-content {
    max-width: 940px;
    margin: 0 auto;
    padding: 40px 20px 90px;
  }

  .welcome-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 26px 28px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
    margin-bottom: 22px;
  }

  .welcome-card h1 {
    margin: 0 0 6px;
    font-size: 24px;
    color: #000000;
  }

  .welcome-card p {
    margin: 0;
    color: #444444;
    font-size: 14px;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 20px;
  }

  @media (max-width: 700px) {
    .cards-grid { grid-template-columns: 1fr; }
  }

  .card {
    background: #ffffff;
    color: #000000;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  .card h2 {
    margin: 0 0 4px;
    font-size: 18px;
    color: #000000;
  }

  .accent-line {
    width: 40px;
    height: 3px;
    background: #c8102e;
    border: none;
    margin: 6px 0 16px;
  }

  .streak-count {
    font-size: 30px;
    font-weight: bold;
    color: #000000;
    margin: 0;
  }

  .streak-sub {
    font-size: 13px;
    color: #666666;
    margin: 4px 0 0;
  }

  .upcoming-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .view-all-link {
    font-size: 13px;
    color: #c8102e;
    text-decoration: none;
  }

  .view-all-link:hover { text-decoration: underline; }

  .upcoming-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .upcoming-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 12px 14px;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
  }

  .upcoming-item.overdue {
    border-color: #c8102e;
    background: #fff5f5;
  }

  .task-title { margin: 0; font-weight: bold; color: #000000; }
  .task-deadline { margin: 4px 0 0; font-size: 12.5px; color: #555555; }

  .overdue-badge {
    background: #c8102e;
    color: #ffffff;
    font-size: 11px;
    font-weight: bold;
    padding: 4px 9px;
    border-radius: 999px;
    white-space: nowrap;
  }

  .empty-note { color: #777777; font-size: 14px; }
`;

export default function Home() {
  const [tasks] = useState(initialTasks);
  const [streak] = useState(3);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const upcoming = tasks
    .filter((t) => !t.done)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  function isOverdue(task) {
    return new Date(task.deadline) < now;
  }

  return (
    <div
      className="home-page"
      style={homeBg ? { backgroundImage: `url(${homeBg})` } : undefined}
    >
      <style>{styles}</style>
      <Navbar />

      <div className="home-content">
        <div className="welcome-card">
          <h1>Welcome back, Spider-Man</h1>
          <p>Here's what's waiting for you today.</p>
        </div>

        <div className="cards-grid">
          <div className="card">
            <h2>Streak</h2>
            <hr className="accent-line" />
            <p className="streak-count">{streak}</p>
            <p className="streak-sub">day streak</p>
          </div>

          <div className="card">
            <div className="upcoming-header">
              <h2>Upcoming</h2>
              <Link to="/todo" className="view-all-link">View all tasks</Link>
            </div>
            <hr className="accent-line" />

            {upcoming.length === 0 ? (
              <p className="empty-note">Nothing on your calendar right now.</p>
            ) : (
              <ul className="upcoming-list">
                {upcoming.map((task) => {
                  const overdue = isOverdue(task);
                  return (
                    <li key={task.id} className={`upcoming-item ${overdue ? "overdue" : ""}`}>
                      <div>
                        <p className="task-title">{task.title}</p>
                        <p className="task-deadline">
                          {new Date(task.deadline).toLocaleString()}
                        </p>
                      </div>
                      {overdue && <span className="overdue-badge">Overdue</span>}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}