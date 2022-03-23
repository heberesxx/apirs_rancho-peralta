const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

// SELECT DE LA PRODUCCION DE LECHE
router.get('/PR_PRODUCCION_LECHE', (req, res) => {
  mysqlConnection.query('SELECT * FROM tbl_PR_PRODUCCION_LECHE', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// VISTA PARA CODIGO DE GANADO 
router.get('/vacas_ordenio', (req, res) => {
  mysqlConnection.query('SELECT * FROM  vacas_ordenio', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});


// PRODUCCION VISTA DE LECHE
router.get('/produccion', (req, res) => {
  mysqlConnection.query('select * from PRODUCCION', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// INSERT PRODUCCION DE LECHE
router.post('/insertarleche', (req, res) => {
  const {
    COD_REGISTRO_GANADO,
    FEC_ORDEÑO,
    DIA_LACTANCIA,
    PRD_LITROS,
    OBS_REGISTRO,
  } = req.body;
  console.log(req.body)
  const query = `call INS_PRODUCCION_LECHE(?,?,?,?,?);
  `;
  mysqlConnection.query(query, [COD_REGISTRO_GANADO, FEC_ORDEÑO, DIA_LACTANCIA, PRD_LITROS, OBS_REGISTRO], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Registro guardado' });
    } else {
      console.log(err);
    }
  });
});

// GET An PRODUCCION
router.get('/mostrar_produccion/:COD_REGISTRO_LECHE', (req, res) => {
  const { COD_REGISTRO_LECHE } = req.params;
  mysqlConnection.query('SELECT * FROM TBL_PR_PRODUCCION_LECHE WHERE COD_REGISTRO_LECHE = ?', [COD_REGISTRO_LECHE], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// ACTUALIZAR PRODUCCION DE LECHE
router.put('/actualizar-produccion-leche/:COD_REGISTRO_LECHE', (req, res) => {
  const {
    FEC_ORDENIO,
    DIA_LACTANCIA,
    PRD_LITROS,
    OBS_REGISTRO
  } = req.body;
  const { COD_REGISTRO_LECHE } = req.params;
  const query = 'CALL UPDATE_PRODUCCION_LECHE(?,?,?,?,?);';
  mysqlConnection.query(query, [COD_REGISTRO_LECHE,
    FEC_ORDENIO,
    DIA_LACTANCIA,
    PRD_LITROS,
    OBS_REGISTRO],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Actualizado' });
      } else {
        console.log(err);
      }
    });
});



// DELETE EN PRODUCCION DE LECHE 
router.delete('/EliminarRegistro/:COD_REGISTRO_LECHE', (req, res) => {
  const { COD_REGISTRO_LECHE } = req.params;

  const query = ` CALL DLT_PRODUCCION_LECHE(?);
    `;
  mysqlConnection.query(query, [COD_REGISTRO_LECHE], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Dato borrado' });
    } else {
      console.log(err);
    }
  });
  console.log(COD_REGISTRO_LECHE)

});

module.exports = router;
