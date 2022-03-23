const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOSTRAR EMBRIÓN POR CÓDIGO

//REGISTRAR UNA NUEVA TRANSFERENCIA DE EMBRIÓN
router.post('/registrar-transferencia-embrion', (req,res)=>{
    const {COD_EMBRION,
        COD_REGISTRO_GANADO,
        estado_embrion
       } = req.body;
    const query=`CALL INS_TRANS_EMBRION(?,?,?);
    `;
    mysqlConnection.query(query, [COD_EMBRION,
        COD_REGISTRO_GANADO,
        estado_embrion], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Transferencia registrada'});
            }else{
                console.log(err);
            }
        });
});

//VER TODAS LAS TRANSFERENCIAS DE EMBRIONES REALIZADAS
router.get('/transferencias-de-embriones', (req,res)=>{
    mysqlConnection.query('SELECT * FROM TRANS_EMBRION', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/transferencias-de-embriones/:COD_TRANS_EMBRION', (req,res)=>{
    const { COD_TRANS_EMBRION } = req.params;
    mysqlConnection.query('SELECT * FROM TRANS_EMBRION WHERE COD_TRANS_EMBRION = ?', [COD_TRANS_EMBRION],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
  });

router.get('/detalles-embrion', (req,res)=>{
    mysqlConnection.query('SELECT * FROM EMBRION', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/vacas-sincronizadas', (req,res)=>{
    mysqlConnection.query('SELECT * FROM VACAS_SINCRONIZADAS', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

//ACTUALIZAR UNA TRANSFERENCIA DE EMBRIONES
router.put('/actualizar-transferencia-embrion/:COD_TRANS_EMBRION', (req,res)=>{
    const { IND_TRANS_EMBRION } = req.body;
    const {COD_TRANS_EMBRION} = req.params;
    const query=`CALL UPD_TRANS_EMBRION(?,?);
    `;
    mysqlConnection.query(query, [COD_TRANS_EMBRION,
        IND_TRANS_EMBRION], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Transferencia actualizada'});
            }else{
                console.log(err);
            }
        });
});

//MOSTRAR LOS EMBRIONES COMPRADOS
router.get('/embrion', (req,res)=>{
    mysqlConnection.query('SELECT * FROM MG_EMBRION', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});
router.get('/detalles_embrion', (req,res)=>{
    mysqlConnection.query('SELECT * FROM detalles_embrion', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});
module.exports = router;