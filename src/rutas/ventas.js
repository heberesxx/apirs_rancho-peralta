const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

// VISTA DE DETALLE VENTAS 
router.get('/detalle_de_ventas', (req, res) => {
  mysqlConnection.query('select * from detalle_de_ventas', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// VISTA DE DETALLE VENTAS 
router.get('/detalle_lotes_ventas', (req, res) => {
  mysqlConnection.query('select * from detalles_lotes_ventas', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// VISTA DE COG GANADO
router.get('/ganado_ventas', (req, res) => {
  mysqlConnection.query('select * from ganado_general_ventas', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});


// VISTA DEL NOMBRE CLIENTE
router.get('/clientes', (req, res) => {
  mysqlConnection.query('select * from clientes', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An PRODUCCION
router.get("detalle_de_ventas/:COD_DETALLE", (req, res) => {
  const { COD_DETALLE } = req.params;
  mysqlConnection.query("SELECT * FROM TBL_MV_DETALLE_VENTA WHERE COD_DETALLE = ?",
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
  const { COD_CLIENTE, FEC_VENTA } = req.body;
  const query = `call INS_VENTAS(?,?);
  `;
  mysqlConnection.query(
    query,
    [COD_CLIENTE, FEC_VENTA],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Registro guardado" });
      } else {
        console.log(err);
      }
    }
  );
});


router.get("/detalle_clientes", (req, res) => {
  const query = "CALL READ_LOTE_VENTA()";
  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
      return;
    }
  });
});

router.post("/confirmarlote_venta", (req, res) => {
  const query = `
      
      CALL CONFIRMAR_LOTE_VENTA();
    `;
  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: "GUARDADO EN COMPRA GANADO" });
    } else {
      console.log(err);
    }
  });
});

router.put("/cancelar_loteventa/:COD_VENTA", (req, res) => {
  const { COD_VENTA } = req.params;

  const query = `CALL CANCELAR_LOTE_VENTA(?);`;
  mysqlConnection.query(query, [COD_VENTA], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: "Ganado Actualizado" });
    } else {
      console.log(err);
    }
  });
});


router.put("/anular_loteventa/:COD_VENTA", (req, res) => {
  const { COD_VENTA } = req.params;

  const query = `CALL ANULAR_LOTE_VENTA(?);`;
  mysqlConnection.query(query, [COD_VENTA], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: "Lote Anulado" });
    } else {
      console.log(err);
    }
  });
});

router.delete("/eliminaritem_venta/:COD_DETALLE_VENTA", (req, res) => {
  const { COD_DETALLE_VENTA } = req.params;

  const query = ` CALL DEL_DETALLE_VENTA(?);
      `;
  mysqlConnection.query(query, [COD_DETALLE_VENTA], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: "Dato borrado" });
    } else {
      console.log(err);
    }
  });
  console.log(COD_DETALLE_VENTA);
});


router.get('/mostrar_loteventa/:COD_VENTA', (req,res)=>{
  const { COD_VENTA } = req.params;
  mysqlConnection.query('SELECT * FROM detalle_de_ventas WHERE COD_VENTA = ?', [COD_VENTA],(err,rows,fields)=>{
      if(!err){
          res.json(rows);
      }else{
          console.log(err);
      }
  });
})
module.exports = router;