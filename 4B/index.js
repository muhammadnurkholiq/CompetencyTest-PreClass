const http = require("http");
const dbConnection = require("./connection/db");

const express = require("express");
const path = require("path");
const app = express()

const hbs = require("hbs");
app.set("view engine", "hbs");

app.use(express.static('express'))
app.use(express.urlencoded({extended: false}))

const contentRoute = require("./routes/content");

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// register view partials
hbs.registerPartials(path.join(__dirname, "views/partials"))

app.set("views", path.join(__dirname, "views"))
app.use("/content",  contentRoute);

// render content artist
app.get("/", function (req, res) {
  const query = "SELECT * FROM provinsi_tb";
  
  dbConnection.getConnection((err, conn) => {
    if (err)throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      let content = [];

      for (let result of results) {
      content.push({
          ...result,
          photo: "/uploads/image/" + result.photo,
          });
      }

      res.render("index.hbs", {title: "Homepage", content})
    });
  });
});

const server = http.createServer(app)
const port = 4000;
server.listen(port, () => {
    console.log('server running on port '+port)
})