const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/trans_monta', (req,res)=>{
    mysqlConnection.query('select  * FROM MONTA', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.post('/agregar-monta', (req, res) =>{
    const { 
        COD_REGISTRO_GANADO,
        FEC_MONTA,
        RAZ_TORO,
        IND_FECUNDACION
        
    } = req.body;
    console.log(req.body)
    const query = ` CALL INS_MONTA(?, ?, ?,?);
    `;
    mysqlConnection.query(query, [
        COD_REGISTRO_GANADO,
        FEC_MONTA,
        RAZ_TORO,
        IND_FECUNDACION
    ],
        (err,rows,fields) => {
            if(!err){
                res.json({Status: 'Monta Registrada'});
            }else {
                console.log(err);
            }
        });
});

router.get('/trans_monta/:COD_MONTA', (req,res)=>{
    const { COD_MONTA } = req.params;
    mysqlConnection.query('SELECT * FROM MONTA WHERE COD_MONTA = ?', [COD_MONTA],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
  });

  router.put('/actualizar-transferencia-monta/:COD_MONTA', (req,res)=>{
    const { IND_TRANS_MONTA} = req.body;
    const {COD_MONTA} = req.params;
    const query=`CALL UPD_TRANS_MONTA(?,?);
    `;
    mysqlConnection.query(query, [COD_MONTA,
        IND_TRANS_MONTA], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Transferencia actualizada'});
            }else{
                console.log(err);
            }
        });
});
module.exports = router;