const express = require("express");
const app = express();
require('dotenv').config();
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser")

const PORT = process.env.PORT || 4000;

//To parse data from request body
app.use(express.json());
//To parse cookie and to fetch token stored inside cookie
app.use(cookieParser()); 

//DB Connection 
dbConnect();

//route import and mount
const userRoutes = require("./routes/user");
app.use('/api/v1',userRoutes);

app.listen(PORT, ()=> console.log(`Server running on http://127.0.0.1:${PORT}`))