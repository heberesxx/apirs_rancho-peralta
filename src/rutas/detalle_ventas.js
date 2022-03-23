const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

// VISTA PARA CODIGO DE GANADO
router.get("/ganado_ventas", (req, res) => {
  mysqlConnection.query("SELECT * FROM ganado_ventas", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//VER EL DETALLE DE LAS VENTAS HECHAS
router.get("/detalleventas", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM MV_DETALLE_VENTA",
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// VISTA DETALLE VENTA
router.get("/detalle_de_ventas", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM detalle_de_ventas",
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// GET An PRODUCCION
router.get("/:COD_DETALLE", (req, res) => {
  const { COD_DETALLE } = req.params;
  mysqlConnection.query(
    "SELECT * FROM MV_DETALLE_VENTA WHERE COD_DETALLE = ?",
    [COD_DETALLE],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
});

// DELETE EN DETALLE DE VENTAS
router.delete("/:COD_DETALLE", (req, res) => {
  const { COD_DETALLE } = req.params;
  8;
  mysqlConnection.query(
    "DELETE FROM MV_DETALLE_VENTA WHERE COD_DETALLE = ?",
    [COD_DETALLE],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Registro eliminado" });
      } else {
        console.log(err);
      }
    }
  );
});

// INSERT DETALLE VENTAS
router.post("/insertardetalleventa", (req, res) => {
  const { COD_REGISTRO_GANADO, PRE_VENTA } = req.body;
  const query = `call INS_DETALLE_VENTAS(?,?);
  `;
  mysqlConnection.query(
    query,
    [COD_REGISTRO_GANADO, PRE_VENTA],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Registro guardado" });
      } else {
        console.log(err);
      }
    }
  );
});

// INSERT VENTAS
router.post("/insertarventa", (req, res) => {
  const { COD_PERSONA, FEC_VENTA } = req.body;
  const query = `call INS_VENTAS(?,?);
  `;
  mysqlConnection.query(
    query,
    [COD_PERSONA, FEC_VENTA],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Registro guardado" });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
