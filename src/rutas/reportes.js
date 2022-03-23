const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");


router.get('/compra_ganado', (req, res) => {
  const fechas = req.query;
  const query = 'CALL READ_COMPRA_GANADO(?,?)';

  mysqlConnection.query(query,[fechas.inicio,fechas.final],(err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

router.get('/produccion_leche', (req, res) => {

  const fechas = req.query;
    
    const query = 'CALL READ_PRODUCCION_LECHE(?,?)';
  mysqlConnection.query(query,[fechas.inicio,fechas.final],(err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});


router.get('/venta_ganado', async (req, res)=>{
    const v_fechas = req.query;
    
    const query = 'CALL READ_VENTA_GANADO(?,?)';
    
    mysqlConnection.query(query,[v_fechas.inicio,v_fechas.final],(err,rows,fields)=> {
        if (!err){
            res.json(rows);

        }else{
            console.log(err);
        }
    });
});


module.exports = router;