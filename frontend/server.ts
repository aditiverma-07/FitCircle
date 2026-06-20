import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
// Using crypto for naive id generation in simple mock
// import crypto from "crypto";

const app = express();
const PORT = 3000;

app.use(express.json());

// --- MOCK DATABASE ---
const db = {
  users: [
    {
      id: "u1",
      name: "Alex",
      email: "alex@example.com",
      currentWeight: 75,
      targetWeight: 70,
      fitnessGoal: "Lose 5kg",
      xp: 450,
      streak: 7
    }
  ],
  groups: [
    {
      id: "g1",
      name: "Roommate Shred",
      members: ["u1"],
      inviteCode: "ROOMIE123"
    }
  ],
  checkIns: [],
  challenges: [],
  feed: [
    {
      id: "f1",
      userId: "u1",
      content: "Completed my 7-day streak! ðª",
      likes: 3,
      comments: [
        { id: "c1", content: "Let's go!!", author: "Sam" }
      ],
      createdAt: new Date().toISOString()
    }
  ]
};

// --- REST APIs ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/auth/login", (req, res) => {
  // Mock login
  const { email } = req.body;
  const user = db.users.find(u => u.email === email);
  if (user) {
    res.json({ token: "fake-jwt-token", user });
  } else {
    // If not found, just return the first user for demo purposes
    res.json({ token: "fake-jwt-token", user: db.users[0] });
  }
});

app.get("/api/user/me", (req, res) => {
  res.json(db.users[0]);
});

app.get("/api/dashboard", (req, res) => {
  res.json({
    user: db.users[0],
    feed: db.feed,
    activeChallenges: [
      { id: "ch1", title: "10,000 steps daily", progress: 80, endIn: "2 days" }
    ],
    groupActivity: "3 messages today"
  });
});

app.post("/api/checkin", (req, res) => {
  const checkIn = req.body;
  checkIn.id = `ci-${Date.now()}`;
  checkIn.date = new Date().toISOString();
  db.checkIns.push(checkIn);
  
  // Update streak logic
  db.users[0].streak += 1;
  db.users[0].xp += 50;

  db.feed.unshift({
    id: `f-${Date.now()}`,
    userId: db.users[0].id,
    content: `Checked in! Mood: ${checkIn.mood}, Weight: ${checkIn.currentWeight}kg.`,
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString()
  });

  res.json({ success: true, newStreak: db.users[0].streak, xp: db.users[0].xp });
});

app.get("/api/groups", (req, res) => {
  res.json(db.groups);
});

app.post("/api/feed/:id/like", (req, res) => {
  const item = db.feed.find(f => f.id === req.params.id);
  if (item) {
    item.likes += 1;
  }
  res.json({ success: true });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
