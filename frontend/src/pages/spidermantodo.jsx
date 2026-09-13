import React, { useState, useMemo } from "react";

/*
  SPIDERMAN TO-DO LIST — Full Screen Fit & White Theme
  ----------------------------------------------------
  - Full screen background image (No black extra space)
  - White containers & cards
  - Red Buttons throughout
  - Arial font
*/

const FIXED_TASK_XP = 20;
const XP_PER_LEVEL = 100;
const REVIVE_COST = 50;

const uid = () => Math.random().toString(36).slice(2, 10);

const styles = `
  /* Global Resets to Remove Black Gaps */
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }

  .sm-app {
    font-family: Arial, Helvetica, sans-serif;
    min-height: 100vh;
    width: 100vw;
    color: #111111;
    position: relative;
    box-sizing: border-box;
    
    /* Background Image Setup */
    background-image: url("download.jpg");
   
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .sm-shell {
    position: relative;
    z-index: 1;
    max-width: 760px;
    margin: 0 auto;
    padding: 28px 20px 120px;
  }

  /* White Topbar Container */
  .sm-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: #ffffff;
    border: 2px solid #c8102e;
    border-radius: 14px;
    padding: 14px 18px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  .sm-streak {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
    font-size: 15px;
    color: #c8102e;
  }

  .sm-streak-broken { color: #d90429; }

  /* Red Buttons */
  .sm-revive-btn {
    font-family: Arial, sans-serif;
    background: #c8102e;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 8px;
  }
  .sm-revive-btn:disabled {
    background: #e0a3ad;
    cursor: not-allowed;
  }

  .sm-xp-block { flex: 1; max-width: 320px; }
  .sm-xp-label {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #444444;
    font-weight: bold;
    margin-bottom: 4px;
  }
  
  .sm-xp-track {
    height: 10px;
    border-radius: 999px;
    background: #e0e0e0;
    overflow: hidden;
    border: 1px solid #ccc;
  }

  .sm-xp-fill {
    height: 100%;
    background: #c8102e;
    transition: width 0.4s ease;
  }

  .sm-heading-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin: 30px 0 16px;
  }

  .sm-heading {
    font-size: 26px;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
    margin: 0;
    letter-spacing: 0.2px;
  }
  .sm-heading span { color: #ff4d4d; }

  .sm-count-pill {
    font-size: 12px;
    font-weight: bold;
    color: #c8102e;
    background: #ffffff;
    border-radius: 999px;
    padding: 4px 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .sm-task-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* White Task Cards */
  .sm-task-card {
    background: #ffffff;
    border-left: 5px solid #c8102e;
    border-radius: 10px;
    padding: 16px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .sm-task-card.done {
    border-left-color: #28a745;
    opacity: 0.7;
  }

  .sm-task-card.upcoming-soon {
    border-left-color: #ff9800;
  }

  .sm-task-main { flex: 1; min-width: 0; }
  
  .sm-task-title {
    font-size: 16px;
    font-weight: bold;
    color: #111111;
    margin: 0 0 4px;
    word-break: break-word;
  }
  
  .sm-task-title.done-text { text-decoration: line-through; color: #777777; }
  
  .sm-task-desc {
    font-size: 13px;
    color: #555555;
    margin: 0 0 8px;
    word-break: break-word;
  }

  .sm-task-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 11px;
  }

  .sm-chip {
    background: #f0f0f0;
    padding: 4px 8px;
    border-radius: 999px;
    color: #333333;
    font-weight: bold;
  }

  .sm-chip.xp-chip { background: #ffe6e6; color: #c8102e; }
  .sm-chip.soon-chip { background: #fff3cd; color: #856404; }

  .sm-task-actions {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-end;
  }

  /* All Red Action Buttons */
  .sm-btn-done, .sm-btn-delete {
    font-family: Arial, sans-serif;
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    white-space: nowrap;
  }

  .sm-btn-done {
    background: #c8102e;
    color: #ffffff;
  }
  
  .sm-btn-done:disabled { 
    background: #e2e2e2; 
    color: #888888; 
    cursor: default; 
  }

  .sm-btn-delete {
    background: #ffffff;
    color: #c8102e;
    border: 1px solid #c8102e;
  }

  .sm-empty {
    text-align: center;
    padding: 40px 20px;
    background: #ffffff;
    border-radius: 12px;
    color: #666666;
    font-size: 14px;
  }

  /* Floating Red Button */
  .sm-fab {
    position: fixed;
    right: 24px;
    bottom: 28px;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: #c8102e;
    border: 2px solid #ffffff;
    color: white;
    font-size: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(0,0,0,0.3);
    z-index: 5;
  }

  .sm-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    padding: 16px;
  }

  /* White Modal Box */
  .sm-modal {
    font-family: Arial, sans-serif;
    background: #ffffff;
    border: 2px solid ;
    border-radius: 14px;
    padding: 22px;
    width: 100%;
    max-width: 400px;
    color: #111111;
  }

  .sm-modal h3 {
    margin: 0 0 16px;
    font-size: 18px;
    color: #c8102e;
  }

  .sm-field { margin-bottom: 12px; }
  .sm-field label {
    display: block;
    font-size: 12px;
    color: #333333;
    font-weight: bold;
    margin-bottom: 4px;
  }

  .sm-field input, .sm-field textarea {
    width: 100%;
    box-sizing: border-box;
    background: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 8px 10px;
    color: #111111;
    font-family: Arial, sans-serif;
    font-size: 16px;
  }

  .sm-field textarea { resize: vertical; min-height: 54px; }

  .sm-modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
  }

  .sm-btn-cancel, .sm-btn-add {
    font-family: Arial, sans-serif;
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 13px;
    cursor: pointer;
    font-weight: bold;
  }

  .sm-btn-cancel { 
    background: #ffffff; 
    color: #333333; 
    border: 1px solid #ccc; 
  }

  .sm-btn-add { 
    background: #c8102e; 
    color: white; 
    border: none;
  }

  .sm-toast {
    position: fixed;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    background: #c8102e;
    color: #ffffff;
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: bold;
    z-index: 20;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }

  .sm-simday {
    font-family: Arial, sans-serif;
    background: #c8102e;
    color: #ffffff;
    border: none;
    font-size: 11px;
    font-weight: bold;
    border-radius: 6px;
    padding: 6px 10px;
    cursor: pointer;
    margin-top: 10px;
  }
`;

function isDueSoon(deadline) {
  if (!deadline) return false;
  const diffMs = new Date(deadline).getTime() - Date.now();
  return diffMs > 0 && diffMs < 1000 * 60 * 60 * 24;
}

export default function SpidermanTodo() {
  const [tasks, setTasks] = useState([
    { id: uid(), title: "Patrol the neighborhood", description: "Quick web-swing check, nothing major.", deadline: "", xp: FIXED_TASK_XP, done: false },
    { id: uid(), title: "Finish DBMS assignment", description: "Submit before the deadline.", deadline: "", xp: FIXED_TASK_XP, done: false },
  ]);
  const [xp, setXp] = useState(60);
  const [streak, setStreak] = useState(3);
  const [streakBroken, setStreakBroken] = useState(false);
  const [completedToday, setCompletedToday] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ title: "", description: "", deadline: "" });

  const level = Math.floor(xp / XP_PER_LEVEL);
  const xpIntoLevel = xp % XP_PER_LEVEL;
  const xpPercent = useMemo(() => (xpIntoLevel / XP_PER_LEVEL) * 100, [xpIntoLevel]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  }

  function openAddModal() {
    setForm({ title: "", description: "", deadline: "" });
    setShowModal(true);
  }

  function handleAddTask(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: uid(),
        title: form.title.trim(),
        description: form.description.trim(),
        deadline: form.deadline,
        xp: FIXED_TASK_XP,
        done: false,
      },
    ]);
    setShowModal(false);
    showToast("Task added!");
  }

  function handleMarkDone(task) {
    if (task.done) return;
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, done: true } : t)));
    setXp((prev) => prev + task.xp);
    setCompletedToday(true);
    if (streakBroken) setStreakBroken(false);
    showToast(`+${task.xp} XP earned! 🕸️`);
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function handleRevive() {
    if (xp < REVIVE_COST) return;
    setXp((prev) => prev - REVIVE_COST);
    setStreakBroken(false);
    showToast("Streak revived using XP!");
  }

  function handleSimulateNewDay() {
    if (completedToday) {
      setStreak((prev) => prev + 1);
    } else if (!streakBroken) {
      setStreakBroken(true);
    }
    setCompletedToday(false);
  }

  const pending = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);
  const ordered = [...pending, ...done];

  return (
    <div className="sm-app">
        <navbar />
      <style>{styles}</style>
      <div className="sm-shell">
        <div className="sm-topbar">
          <div>
            <div className={`sm-streak ${streakBroken ? "sm-streak-broken" : ""}`}>
              🔥 {streakBroken ? "Streak broken" : `${streak} day streak`}
              {streakBroken && (
                <button className="sm-revive-btn" onClick={handleRevive} disabled={xp < REVIVE_COST}>
                  Revive (-{REVIVE_COST} XP)
                </button>
              )}
            </div>
            <button className="sm-simday" onClick={handleSimulateNewDay}>
              Simulate day passing (demo)
            </button>
          </div>
          <div className="sm-xp-block">
            <div className="sm-xp-label">
              <span>Level {level}</span>
              <span>{xpIntoLevel} / {XP_PER_LEVEL} XP</span>
            </div>
            <div className="sm-xp-track">
              <div className="sm-xp-fill" style={{ width: `${xpPercent}%` }} />
            </div>
          </div>
        </div>

        <div className="sm-heading-row">
          <h2 className="sm-heading">Upcoming <span>Events</span></h2>
          <span className="sm-count-pill">{pending.length} active</span>
        </div>

        {ordered.length === 0 ? (
          <div className="sm-empty">No tasks yet — hit the button to add your first one.</div>
        ) : (
          <div className="sm-task-list">
            {ordered.map((task) => {
              const soon = !task.done && isDueSoon(task.deadline);
              return (
                <div key={task.id} className={`sm-task-card ${task.done ? "done" : ""} ${soon ? "upcoming-soon" : ""}`}>
                  <div className="sm-task-main">
                    <p className={`sm-task-title ${task.done ? "done-text" : ""}`}>{task.title}</p>
                    {task.description && <p className="sm-task-desc">{task.description}</p>}
                    <div className="sm-task-meta">
                      <span className="sm-chip xp-chip">+{task.xp} XP</span>
                      {task.deadline && <span className="sm-chip">{new Date(task.deadline).toLocaleString()}</span>}
                      {soon && <span className="sm-chip soon-chip">Due soon</span>}
                    </div>
                  </div>
                  <div className="sm-task-actions">
                    <button className="sm-btn-done" onClick={() => handleMarkDone(task)} disabled={task.done}>
                      {task.done ? "Done ✓" : "Mark done"}
                    </button>
                    <button className="sm-btn-delete" onClick={() => handleDelete(task.id)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button className="sm-fab" onClick={openAddModal} aria-label="Add task">🕸️</button>

      {showModal && (
        <div className="sm-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="sm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>New task</h3>
            <form onSubmit={handleAddTask}>
              <div className="sm-field">
                <label>Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Finish physics lab report"
                  required
                />
              </div>
              <div className="sm-field">
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Any extra details"
                />
              </div>
              <div className="sm-field">
                <label>Deadline</label>
                <input
                  type="datetime-local"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                />
              </div>
              <p style={{ fontSize: "12px", color: "#666666", margin: "0 0 12px" }}>
                Every task is worth a fixed {FIXED_TASK_XP} XP.
              </p>
              <div className="sm-modal-actions">
                <button type="button" className="sm-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="sm-btn-add">Add task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <div className="sm-toast">{toast}</div>}
    </div>
  );
}