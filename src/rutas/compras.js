const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

// OBTERNER TODAS LAS COMPRAS
router.get("/compras", (req, res) => {
  mysqlConnection.query("SELECT * FROM vganado", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get("/lote_actual", (req, res) => {
  mysqlConnection.query("SELECT * FROM lote_actual", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get("/detalle_lote", (req, res) => {
  const query = "CALL READ_PROVEEDOR()";
  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
      return;
    }
  });
});

// router.get("/detalle_proveedor", (req, res) => {
//   const query = "CALL READ_PROVEEDOR()";
//   mysqlConnection.query(query, (err, rows, fields) => {
//     if (!err) {
//       res.json(rows[2]);
//     } else {
//       console.log(err);
//       return;
//     }
//   });
// });

// router.get("/detalle_fecha", (req, res) => {
//   const query = "CALL READ_PROVEEDOR()";
//   mysqlConnection.query(query, (err, rows, fields) => {
//     if (!err) {
//       res.json(rows[3]);
//     } else {
//       console.log(err);
//       return;
//     }
//   });
// });

// router.get("/detalle_cantidad", (req, res) => {
//   const query = "CALL READ_PROVEEDOR()";
//   mysqlConnection.query(query, (err, rows, fields) => {
//     if (!err) {
//       res.json(rows[4]);
//     } else {
//       console.log(err);
//       return;
//     }
//   });
// });

// router.get("/detalle_total", (req, res) => {
//   const query = "CALL READ_PROVEEDOR()";
//   mysqlConnection.query(query, (err, rows, fields) => {
//     if (!err) {
//       res.json(rows[5]);
//     } else {
//       console.log(err);
//       return;
//     }
//   });
// });

// router.get("/detalle_vaca", (req, res) => {
//   const query = "CALL READ_PROVEEDOR()";
//   mysqlConnection.query(query, (err, rows, fields) => {
//     if (!err) {
//       res.json(rows[6]);
//     } else {
//       console.log(err);
//       return;
//     }
//   });
// });

// DELETE EN COMPRAS GANADO
router.delete("/:COD_COMPRA_GANADO", (req, res) => {
  const { COD_COMPRA_GANADO } = req.params;
  mysqlConnection.query(
    "CALL DLT_COMPRAG(?)",
    [COD_COMPRA_GANADO],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "ELIMINADO DE HISTORIAL DE COMPRAS" });
      } else {
        console.log(err);
      }
    }
  );
});

// INSERT A COMPRA GANADO
router.post("/insertarcompraganado", (req, res) => {
  const {
    NOMBRE,
    COLOR,
    COD_ESTADO,
    LUGAR,
    PESO,
    FIERRO,
    COD_RAZA,
    SEXO,
    PRECIO,
  } = req.body;
  console.log(
    NOMBRE,
    COLOR,
    COD_ESTADO,
    LUGAR,
    PESO,
    FIERRO,
    COD_RAZA,
    SEXO,
    PRECIO
  );
  const query = `
      
      CALL SP_COMPRA_GANADO(?,?,?,?,?,?,?,?,?);
    `;
  mysqlConnection.query(
    query,
    [NOMBRE, COLOR, COD_ESTADO, LUGAR, PESO, FIERRO, COD_RAZA, SEXO, PRECIO],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "GUARDADO EN COMPRA GANADO" });
      } else {
        console.log(err);
      }
    }
  );
});

router.post("/confirmarlote", (req, res) => {
  const query = `
      
      CALL CONFIRMAR_LOTE();
    `;
  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: "GUARDADO EN COMPRA GANADO" });
    } else {
      console.log(err);
    }
  });
});

router.get('/mostrar_lote/:COD_COMPRA_GANADO', (req,res)=>{
  const { COD_COMPRA_GANADO } = req.params;
  mysqlConnection.query('SELECT * FROM VGANADO WHERE COD_COMPRA_GANADO = ?', [COD_COMPRA_GANADO],(err,rows,fields)=>{
      if(!err){
          res.json(rows);
      }else{
          console.log(err);
      }
  });
})

router.put("/cancelar_lote/:COD_COMPRA_GANADO", (req, res) => {
  const { COD_COMPRA_GANADO } = req.params;

  const query = `CALL CANCELAR_LOTE(?);`;
  mysqlConnection.query(query, [COD_COMPRA_GANADO], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: "Ganado Actualizado" });
    } else {
      console.log(err);
    }
  });
});

router.delete("/eliminaritem/:COD_DETALLE_COMPRA", (req, res) => {
  const { COD_DETALLE_COMPRA } = req.params;

  const query = ` CALL DEL_DETALLE_COMPRA(?);
      `;
  mysqlConnection.query(query, [COD_DETALLE_COMPRA], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: "Dato borrado" });
    } else {
      console.log(err);
    }
  });
  console.log(COD_DETALLE_COMPRA);
});

router.delete("/borrar_lote/:COD_COMPRA_GANADO", (req, res) => {
  const { COD_COMPRA_GANADO } = req.params;

  const query = ` CALL DEL_LOTE(?);
      `;
  mysqlConnection.query(query, [COD_COMPRA_GANADO], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: "Dato borrado" });
    } else {
      console.log(err);
    }
  });
  console.log(COD_COMPRA_GANADO);
});

module.exports = router;
