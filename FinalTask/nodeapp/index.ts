import express from "express";
import jwt from "jsonwebtoken";
import mysql from "mysql2";
import bodyParser from "body-parser";
import path from "path";

const PORT = 3000;
const JWT_SECRET = "secret123";

const app = express();

const db = mysql.createPool({
  host: "mysql",
  user: "admin",
  password: "admin",
  database: "ai_tools_catalog",
});

function verifyToken(req: any, res: any, next: any) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(403).send("No token");
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.user = user;
    next();
  });
}

app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username == "admin" && password == "admin") {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }
  res.status(401).json({ error: "Invalid un/pw" });
});

app.get("/ai-tools", verifyToken, (req, res) => {
  try {
    const [rows] = db.query(`
      SELECT name, year_published, cost_usd_per_month, average_monthly_users
      FROM ai_tools
    `);
    res.json(rows);
  } 
  catch (err) {
    res.status(500).json({ error: "Db error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});