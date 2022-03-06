require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const app = express();

connection();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

const port = process.env.PORT || 8080;

app.listen(port, console.log(`Server is listen on port ${port}...`));
