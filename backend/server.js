const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "todos.json");

app.use(cors());
app.use(express.json());

// ----- helpers -----
function loadTodos() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "[]");
      return [];
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8") || "[]");
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

// ----- API -----
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend running" });
});

// saari tasks
app.get("/api/todos", (req, res) => {
  res.json(loadTodos());
});

// nayi task
app.post("/api/todos", (req, res) => {
  const { title, description = "", deadline = null } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title required" });
  }
  const todo = {
    id: uuidv4(),
    title: title.trim(),
    description: (description || "").trim(),
    deadline: deadline || null,
    done: false,
    createdAt: new Date().toISOString(),
  };
  const todos = loadTodos();
  todos.unshift(todo);
  saveTodos(todos);
  res.status(201).json(todo);
});

// update / mark done
app.put("/api/todos/:id", (req, res) => {
  const todos = loadTodos();
  const i = todos.findIndex((t) => t.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: "Not found" });

  const { title, description, deadline, done } = req.body;
  todos[i] = {
    ...todos[i],
    ...(title !== undefined && { title: title.trim() }),
    ...(description !== undefined && { description: description.trim() }),
    ...(deadline !== undefined && { deadline }),
    ...(done !== undefined && { done: Boolean(done) }),
  };
  saveTodos(todos);
  res.json(todos[i]);
});

// delete
app.delete("/api/todos/:id", (req, res) => {
  const todos = loadTodos();
  const filtered = todos.filter((t) => t.id !== req.params.id);
  if (filtered.length === todos.length) {
    return res.status(404).json({ error: "Not found" });
  }
  saveTodos(filtered);
  res.json({ ok: true });
});

// frontend build serve karna ho to (optional)
// pehle frontend me: npm run build
// phir ye lines uncomment karo:
/*
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
*/

app.listen(PORT, () => {
  console.log("Backend running on http://localhost:" + PORT);
});