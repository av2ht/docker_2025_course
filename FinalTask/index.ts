const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

const pool = mysql.createPool({
   host: "18.236.174.222", // Change to your DB host
   //port: process.env.DB_PORT,
   user: "root", // Change to your DB user
   password: "root", // Change to your DB password
   database: "northwind" // Make sure this DB exists
});

app.get("/users", (req, res) => {
  pool.query("SELECT * FROM ai_tools", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log(results);
    res.json(results);
  });
});
 

app.listen(port, () => {
  console.log(`API running at http://localhost`);
});
