const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');
//MOSTRAR EL ESPERMA COMPRADO
router.get('/esperma', (req,res)=>{
    mysqlConnection.query('SELECT * FROM MC_ESPERMA', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});
//MOSTRAR ESPERMA  POR NÚMERO DE PAJILLA
router.get('/esperma/:numpajilla', (req,res)=>{
    const { numpajilla } = req.params;
    mysqlConnection.query('SELECT * FROM MG_EMBRION WHERE NUM_PAJILLA = ?', [numpajilla],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});



//REGISTRAR UNA NUEVA TRANSFERENCIA DE ESPERMA
router.post('/registrar-transferencia-esperma', (req,res)=>{
    const {NUM_PAJILLA,
        COD_REGISTRO_GANADO,
        IND_TRANS_ESPERMA
       } = req.body;
    const query=`CALL INS_TRANS_ESPERMA(?,?,?);
    `;
    mysqlConnection.query(query, [NUM_PAJILLA,
        COD_REGISTRO_GANADO,
        IND_TRANS_ESPERMA], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Transferencia registrada'});
            }else{
                console.log(err);
            }
        });
});
//VER LOS DETALLES DEL ESPERMA
router.get('/detalles-esperma', (req,res)=>{
    mysqlConnection.query('SELECT * FROM ESPERMA', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});
//VER TODAS LAS TRANSFERENCIAS DE ESPERMA REALIZADAS

router.get('/transferencias-de-esperma', (req,res)=>{
    mysqlConnection.query('SELECT * FROM TRANSF_ESPERMA', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});



//VER TRANFERENCIA POR CÓDIGO
/*router.get('/transferencias-de-esperma/:COD_TRANS_ESPERMA', (req,res)=>{
    const { COD_TRANS_ESPERMA } = req.params;
    mysqlConnection.query('SELECT * FROM TRANSF_ESPERMA WHERE COD_TRANS_ESPERMA = ?', [COD_TRANS_ESPERMA],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
  });*/

  router.get('/transferencias-de-esperma/:COD_TRANS_ESPERMA', (req,res)=>{
    const { COD_TRANS_ESPERMA } = req.params;
    mysqlConnection.query('SELECT * FROM TBL_MG_TRANS_ESPERMA WHERE COD_TRANS_ESPERMA = ?', [COD_TRANS_ESPERMA],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
  });

//ACTUALIZAR UNA TRANSFERENCIA DE ESPERMA

router.put('/actualizar-transferencia-esperma/:COD_TRANS_ESPERMA', (req,res)=>{
    const { IND_TRANS_ESPERMA} = req.body;
    const {COD_TRANS_ESPERMA} = req.params;
    const query=`CALL UPD_TRANS_ESPERMA(?,?);
    `;
    mysqlConnection.query(query, [COD_TRANS_ESPERMA,
        IND_TRANS_ESPERMA], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Transferencia actualizada'});
            }else{
                console.log(err);
            }
        });
});

module.exports = router;