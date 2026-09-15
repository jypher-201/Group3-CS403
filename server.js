require("dotenv").config();
const app = require("./src/app");
const pool = require("./src/config/db");

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
});

pool.query("SELECT NOW()")
    .then(() => {
        console.log("Connected to PostgreSQL database successfully!");
    })
    .catch((err) => {
        console.error("Database connection failed:", err.message);
    });