const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");
//MOSTRAR EL GANADO EN GENERAL
router.get("/ganado_general", (req, res) => {
  mysqlConnection.query("SELECT * FROM ganado_general", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});
//MOSTRAR EL GANADO POR ARETE
router.get("/ganado/:arete", (req, res) => {
  const { arete } = req.params;
  mysqlConnection.query(
    "SELECT * FROM MG_GANADO WHERE NUM_ARETE = ?",
    [arete],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//INSERTAR UN  NUEVO GANADO
router.post("/insertarganado", (req, res) => {
  const {
    NUM_ARETE,
    nombre_ganado,
    color,
    COD_ESTADO,
    lugar,
    peso,
    fierro,
    COD_RAZA,
    sexo_ganado,
  } = req.body;
  const query = `CALL INS_GANADO(?,?,?,?,?,?,?,?,?);`;
  mysqlConnection.query(
    query,
    [
      NUM_ARETE,
      nombre_ganado,
      color,
      COD_ESTADO,
      lugar,
      peso,
      fierro,
      COD_RAZA,
      sexo_ganado,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Ganado registrado" });
      } else {
        console.log(err);
      }
    }
  );
});
//ACTUALIZAR GANADO
router.put("/actualizarganado/:COD_REGISTRO_GANADO", (req, res) => {
  const { NUM_ARETE,nombre_ganado,color_ganado,COD_RAZA, sexo_ganado,COD_ESTADO, lugar, peso, fierro } = req.body;
  const { COD_REGISTRO_GANADO } = req.params;

  const query = `CALL UPD_GANADO(?,?,?,?,?,?,?,?,?,?);`;
  mysqlConnection.query(
    query,
    [COD_REGISTRO_GANADO, NUM_ARETE,nombre_ganado,color_ganado,COD_RAZA, sexo_ganado, COD_ESTADO, lugar, peso, fierro],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Ganado Actualizado" });
      } else {
        console.log(err);
      }
    }
  );
});

router.get('/ganado_general/:cod_registro_ganado', (req, res) => {
  const { cod_registro_ganado } = req.params;
  mysqlConnection.query('SELECT * FROM ganado_general WHERE cod_registro_ganado = ?', [cod_registro_ganado], (err,rows, fields) =>{
      if(!err){
          res.json(rows[0]);
      }else{
          console.log(err);
      }
  });
} );

router.get("/estado", (req, res) => {
  const query = "CALL READ_ESTADO_GANADO()";

  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
      return;
    }
  });
});

router.get("/raza", (req, res) => {
  const query = "CALL READ_RAZA()";

  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
      return;
    }
  });
});

router.get("/lugar", (req, res) => {
  const query = "CALL READ_LUGAR()";

  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
      return;
    }
  });
});

module.exports = router;
