const dbConnection = require("../connection/db");
const router = require("express").Router();
const express = require("express");
const path = require("path");
const app = express();

const uploadFile = require("../middlewares/uploadFile");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// add provinsi
router.get("/add_provinsi", function (req, res) {
    res.render("content/add_provinsi", { title: "Tambah Provinsi"});
});

router.post("/add_provinsi", uploadFile("image"), function (req, res) {
  let { nama, diresmikan, pulau } = req.body;
  let image = req.file.filename;

  const query = "INSERT INTO provinsi_tb (nama, diresmikan, photo, pulau) VALUES (?,?,?,?)";

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, [nama, diresmikan, image, pulau ], (err, result) => {
      if (err) {
        return res.redirect("/content/add_provinsi");
      } else {  
        return res.redirect("/");
      }
    });
    conn.release();
  });
});

// add kabupaten
router.get("/add_kabupaten", function (req, res) {
  const query = "SELECT * FROM provinsi_tb";
  
  dbConnection.getConnection((err, conn) => {
    if (err)throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      let kabupaten = [];

      for (let result of results) {
        kabupaten.push({
          ...result
        });
      }

      res.render("content/add_kabupaten", { title: "Tambah Kabupaten", kabupaten});
    });
  });
});

router.post("/add_kabupaten", uploadFile("image"), function (req, res) {
  let { nama, provinsi, diresmikan} = req.body;
  let image = req.file.filename;


  const query = "INSERT INTO kabupaten_tb (nama, provinsi_id, diresmikan, photo) VALUES (?,?,?,?)";

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, [nama, provinsi, diresmikan, image ], (err, result) => {
      if (err) {
        return res.redirect("/content/add_kabupaten");
      } else {  
        return res.redirect("/");
      }
    });
    conn.release();
  });
});

// kabupaten 
router.get("/kabupaten:id", function (req, res) {
  const { id } = req.params;

  const query = "SELECT * FROM kabupaten_tb WHERE provinsi_id = ?";
  
  dbConnection.getConnection((err, conn) => {
    if (err)throw err;

    conn.query(query, [id],(err, results) => {
      if (err) throw err;

      let kabupaten = [];

      for (let result of results) {
        kabupaten.push({
          ...result,
          photo: "/uploads/image/" + result.photo,
        });
      }

      res.render("content/kabupaten", { title: "Kabupaten", kabupaten});
    });
  });
});

router.get("/edit_kabupaten:id", function (req, res) {
  const { id } = req.params;

  const query = "SELECT kabupaten_tb.nama AS kab_nama, kabupaten_tb.provinsi_id AS kab_id, kabupaten_tb.diresmikan AS kab_diresmikan, provinsi_tb.id AS prov_id, provinsi_tb.nama AS prov_nama FROM kabupaten_tb INNER JOIN provinsi_tb ON kabupaten_tb.id = ? && provinsi_tb.id = kabupaten_tb.provinsi_id";
  
  dbConnection.getConnection((err, conn) => {
    if (err)throw err;

    conn.query(query, [id],(err, results) => {
      if (err) throw err;

      let ukabupaten = [];

      for (let result of results) {
        ukabupaten.push({
          ...result,
          photo: "/uploads/image/" + result.photo,
        });
      }

      res.render("content/edit_kabupaten", { title: "Ubah Kabupaten", ukabupaten});
    });

    conn.release();
  });
});

router.post("/edit_kabupaten:id", uploadFile("image"), function (req, res) {
  const { id } = req.params;
  let { nama, provinsi, diresmikan, image} = req.body;
  
  if (req.file) {
    image = req.file.filename;
  }

  const query = "UPDATE kabupaten_tb SET nama = ?, provinsi_id = ?, diresmikan = ?, photo = ? WHERE id = ?";

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, [nama, provinsi, diresmikan, image, id], (err, result) => {
      if (err) {
        return res.redirect("/content/edit_kabupaten");
      } else {  
        return res.redirect("/");
      }
    });
    conn.release();
  });
});

router.get("/delete_kabupaten", function (req, res) {
  const { id } = req.b;

  const query = "DELETE FROM kabupaten_tb WHERE id = ?";

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, [id], (err, results) => {
      if (err) {
        res.redirect("/");
      }

      res.redirect("/");
    });

    conn.release();
  });
});

router.get("/delete_provinsi:id", function (req, res) {
  const { id } = req.params;

  const query = "DELETE FROM provinsi_tb WHERE id = ?";

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, [id], (err, results) => {
      if (err) {
        res.redirect("/");
      }

      res.redirect("/");
    });

    conn.release();
  });
});

module.exports = router;