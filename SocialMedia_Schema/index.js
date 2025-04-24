const express = require("express");
const app = express();
require("dotenv").config(); //Loads environment variables from .env file into process object
const dbConnection = require("./config/database"); //Custom module to connect to the DB
const PORT = process.env.PORT || 4000; //Default port fallback

//middleware to parse json request body
app.use(express.json()); //Parses incoming JSON requests

const blogRoutes = require('./routes/blog');

//mount
app.use("/api/v1", blogRoutes);

dbConnection(); //Connect to your DB before starting the server

app.listen(PORT,()=>{
  console.log(`Server Running on port ${PORT}`)
})

app.get("/", (req,res) => {
  res.send(`<h1>Welcome to homepage</h1>`)
})