import express from "express";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const PORT = 3000;
const JWT_SECRET = "secret123";

const db = mysql.createPool({
  host: "mysql", 
  user: "admin",
  password: "admin",
  database: "ai_tools_catalog",
});

function verifyToken(req: any, res: any, next: any) {
  const header = req.headers["authorization"];
  const token = header?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Missing token" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); 

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

app.get("/ai-tools", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT name, year_published, cost_usd_per_month, average_monthly_users FROM ai_tools"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});