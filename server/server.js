const express = require("express");
const app = express();
const mysql = require("mysql");
const myconn = require("express-myconnection");
const path = require("path");

app.use(myconn(mysql, {
    host: "localhost",
    port: 3306,
    user: "root",
    database: "images"
}))

app.listen(3001, () => {
    console.log("Server running on port 3001");
})

app.use(require("./routes/imageRoute"));

app.use(express.static(path.join(__dirname, "/dbImages")));