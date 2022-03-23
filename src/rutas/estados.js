const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.post('/insertar_estado', (req,res)=>{
    const {DET_ESTADO,
        descripcion_estado
    } = req.body;

    const query=`CALL INS_ESTADO(?,?);
    `;
    mysqlConnection.query(query, [DET_ESTADO,
        descripcion_estado], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Persona registrada'});
            }else{
                console.log(err);
            }
        });
});

router.get('/mostrar_estado/:COD_ESTADO', (req,res)=>{
    const { COD_ESTADO } = req.params;
    mysqlConnection.query('SELECT * FROM TBL_MG_ESTADO_GANADO WHERE COD_ESTADO = ?', [COD_ESTADO],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})

router.get('/estados_ternero', (req,res)=>{
    mysqlConnection.query('select  * FROM estados_terneros', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.put('/actualizar_estado/:COD_ESTADO', (req,res)=>{
    const {
        DET_ESTADO,
        descripcion_estado,
        status
    } = req.body;
    const {COD_ESTADO} = req.params;
    const query=`CALL UPD_ESTADO(?,?,?,?);
    `;
    mysqlConnection.query(query, [COD_ESTADO,
        DET_ESTADO,
        descripcion_estado,
        status], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Cliente actualizado'});
            }else{
                console.log(err);
            }
        });
});

module.exports = router;