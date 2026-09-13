import React, { useState, useMemo } from "react";

/*
  SPIDERMAN TO-DO LIST — "Upcoming Events" page
  --------------------------------------------
  - Arial font throughout (as requested)
  - XP bar that fills as you complete tasks
  - Streak counter that breaks if you skip a day, revivable by spending XP
  - Add Task opens a modal (title, description, deadline) — XP is fixed at 20 per task
  - Mark Done / Delete on each task card
  - No background image — plain dark theme with a subtle web-line texture
*/

const FIXED_TASK_XP = 20;
const XP_PER_LEVEL = 100;
const REVIVE_COST = 50;

const uid = () => Math.random().toString(36).slice(2, 10);

const styles = `
  .sm-app {
    background-image: url("download.jpg")
    font-family: Arial, Helvetica, sans-serif;
    min-height: 100vh;
    color: #eef1f7;
    position: relative;
  }
  .sm-app::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(6,8,15,0.88) 0%, rgba(10,14,26,0.92) 55%, rgba(6,8,15,0.96) 100%);
    pointer-events: none;
  }
  .sm-web-lines {
    position: fixed;
    inset: 0;
    opacity: 0.07;
    pointer-events: none;
    background-image:
      repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 90px),
      repeating-linear-gradient(-45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 90px);
  }
  .sm-shell {
    position: relative;
    z-index: 1;
    max-width: 760px;
    margin: 0 auto;
    padding: 28px 20px 120px;
  }
  .sm-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: rgba(17, 22, 38, 0.72);
    border: 1px solid rgba(200, 16, 46, 0.35);
    border-radius: 14px;
    padding: 14px 18px;
    backdrop-filter: blur(6px);
  }
  .sm-streak {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
    font-size: 15px;
    color: #ffd166;
  }
  .sm-streak-broken { color: #ff6b6b; }
  .sm-revive-btn {
    font-family: Arial, sans-serif;
    background: #c8102e;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 8px;
  }
  .sm-revive-btn:disabled {
    background: #4a2530;
    color: #a9a3a3;
    cursor: not-allowed;
  }
  .sm-xp-block { flex: 1; max-width: 320px; }
  .sm-xp-label {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #b9c0d4;
    margin-bottom: 4px;
  }
  .sm-xp-track {
    height: 10px;
    border-radius: 999px;
    background: rgba(255,255,255,0.08);
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.12);
  }
  .sm-xp-fill {
    height: 100%;
    background: linear-gradient(90deg, #1b2a63, #3457d5, #ffd166);
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
    color: #f5f5f5;
    margin: 0;
    letter-spacing: 0.2px;
  }
  .sm-heading span { color: #c8102e; }
  .sm-count-pill {
    font-size: 12px;
    color: #b9c0d4;
    background: rgba(255,255,255,0.06);
    border-radius: 999px;
    padding: 4px 10px;
  }
  .sm-task-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .sm-task-card {
    background: rgba(15, 19, 33, 0.82);
    border-left: 4px solid #c8102e;
    border-radius: 10px;
    padding: 14px 16px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    transition: transform 0.15s ease, border-color 0.15s ease;
  }
  .sm-task-card.done {
    border-left-color: #2fbf71;
    opacity: 0.6;
  }
  .sm-task-card.upcoming-soon {
    border-left-color: #ffd166;
    box-shadow: 0 0 0 1px rgba(255, 209, 102, 0.25);
  }
  .sm-task-main { flex: 1; min-width: 0; }
  .sm-task-title {
    font-size: 16px;
    font-weight: bold;
    margin: 0 0 4px;
    word-break: break-word;
  }
  .sm-task-title.done-text { text-decoration: line-through; color: #8f97ab; }
  .sm-task-desc {
    font-size: 13px;
    color: #c3c9db;
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
    background: rgba(255,255,255,0.08);
    padding: 3px 8px;
    border-radius: 999px;
    color: #d7dcec;
  }
  .sm-chip.xp-chip { background: rgba(255, 209, 102, 0.18); color: #ffd166; }
  .sm-chip.soon-chip { background: rgba(255, 107, 107, 0.18); color: #ff8a8a; }
  .sm-task-actions {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-end;
  }
  .sm-btn-done, .sm-btn-delete {
    font-family: Arial, sans-serif;
    border: none;
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 12px;
    cursor: pointer;
    white-space: nowrap;
  }
  .sm-btn-done {
    background: #1b2a63;
    color: #eef1f7;
    font-weight: bold;
  }
  .sm-btn-done:disabled { background: #22301f; color: #7fbf7f; cursor: default; }
  .sm-btn-delete {
    background: transparent;
    color: #ff8a8a;
    border: 1px solid rgba(255,138,138,0.4);
  }
  .sm-empty {
    text-align: center;
    padding: 40px 20px;
    color: #8f97ab;
    font-size: 14px;
  }
  .sm-fab {
    position: fixed;
    right: 24px;
    bottom: 28px;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #e2274a, #8a0f26);
    border: 2px solid rgba(255,255,255,0.25);
    color: white;
    font-size: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(200,16,46,0.45);
    z-index: 5;
  }
  .sm-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(4,6,12,0.72);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    padding: 16px;
  }
  .sm-modal {
    font-family: Arial, sans-serif;
    background: #111627;
    border: 1px solid rgba(200,16,46,0.4);
    border-radius: 14px;
    padding: 22px;
    width: 100%;
    max-width: 400px;
  }
  .sm-modal h3 {
    margin: 0 0 16px;
    font-size: 18px;
  }
  .sm-field { margin-bottom: 12px; }
  .sm-field label {
    display: block;
    font-size: 12px;
    color: #b9c0d4;
    margin-bottom: 4px;
  }
  .sm-field input, .sm-field textarea {
    width: 100%;
    box-sizing: border-box;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 8px;
    padding: 8px 10px;
    color: #eef1f7;
    font-family: Arial, sans-serif;
    font-size: 13px;
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
    border: none;
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 13px;
    cursor: pointer;
    font-weight: bold;
  }
  .sm-btn-cancel { background: transparent; color: #b9c0d4; border: 1px solid rgba(255,255,255,0.2); }
  .sm-btn-add { background: #c8102e; color: white; }
  .sm-toast {
    position: fixed;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    background: #1b2a63;
    border: 1px solid #3457d5;
    color: #ffd166;
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: bold;
    z-index: 20;
    animation: sm-toast-in 0.25s ease;
  }
  @keyframes sm-toast-in {
    from { opacity: 0; transform: translate(-50%, -8px); }
    to { opacity: 1; transform: translate(-50%, 0); }
  }
  .sm-simday {
    font-family: Arial, sans-serif;
    background: transparent;
    border: 1px dashed rgba(255,255,255,0.25);
    color: #8f97ab;
    font-size: 11px;
    border-radius: 8px;
    padding: 5px 9px;
    cursor: pointer;
    margin-top: 10px;
  }
`;

function isDueSoon(deadline) {
  if (!deadline) return false;
  const diffMs = new Date(deadline).getTime() - Date.now();
  return diffMs > 0 && diffMs < 1000 * 60 * 60 * 24; // within 24h
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
    showToast("Task added to your web!");
  }

  function handleMarkDone(task) {
    if (task.done) return;
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, done: true } : t)));
    setXp((prev) => prev + task.xp);
    setCompletedToday(true);
    if (streakBroken) setStreakBroken(false);
    showToast(`+${task.xp} XP swung in! 🕸️`);
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

  // Demo-only: simulates a day passing so you can see streak logic work.
  // In a real app this check would run server-side against real dates.
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
      <style>{styles}</style>
      <div className="sm-web-lines" />
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
          <div className="sm-empty">No tasks yet — hit the web button to add your first one.</div>
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
              <p style={{ fontSize: "12px", color: "#8f97ab", margin: "0 0 12px" }}>
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