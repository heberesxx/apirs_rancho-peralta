const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.post('/insertar_lugar', (req,res)=>{
    const {direccion_lugar,
        ubicacion_exacta
    } = req.body;

    const query=`CALL INS_LUGAR(?,?);
    `;
    mysqlConnection.query(query, [direccion_lugar,
        ubicacion_exacta], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Persona registrada'});
            }else{
                console.log(err);
            }
        });
});

router.get('/mostrar_lugar/:COD_LUGAR', (req,res)=>{
    const { COD_LUGAR } = req.params;
    mysqlConnection.query('SELECT * FROM TBL_MG_LUGAR WHERE COD_LUGAR = ?', [COD_LUGAR],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})

router.put('/actualizar_lugar/:COD_LUGAR', (req,res)=>{
    const {
        direccion_lugar,
        ubicacion_exacta,
        status
    } = req.body;
    const {COD_LUGAR} = req.params;
    const query=`CALL UPD_LUGAR(?,?,?,?);
    `;
    mysqlConnection.query(query, [COD_LUGAR,
        direccion_lugar,
        ubicacion_exacta,
        status], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Cliente actualizado'});
            }else{
                console.log(err);
            }
        });
});

router.delete('/eliminar_lugar/:COD_LUGAR', (req, res) => {
    const { COD_LUGAR } = req.params;
  
    const query = ` CALL DLT_LUGAR(?);
      `;
    mysqlConnection.query(query, [COD_LUGAR], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'borrada' });
      } else {
        console.log(err);
      }
    });
    console.log(COD_LUGAR)
  
  });

module.exports = router;