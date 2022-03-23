const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.post('/insertar_raza', (req,res)=>{
    const {NOM_RAZA,
        detalle_raza
    } = req.body;

    const query=`CALL INS_RAZA(?,?);
    `;
    mysqlConnection.query(query, [NOM_RAZA,
        detalle_raza], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Persona registrada'});
            }else{
                console.log(err);
            }
        });
});

router.get('/mostrar_raza/:COD_RAZA', (req,res)=>{
    const { COD_RAZA } = req.params;
    mysqlConnection.query('SELECT * FROM TBL_MG_RAZA WHERE COD_RAZA = ?', [COD_RAZA],(err,rows,fields)=>{
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

router.put('/actualizar_raza/:COD_RAZA', (req,res)=>{
    const {
        NOM_RAZA,
        detalle_raza,
        status_raza
    } = req.body;
    const {COD_RAZA} = req.params;
    const query=`CALL UPD_RAZA(?,?,?,?);
    `;
    mysqlConnection.query(query, [COD_RAZA,
        NOM_RAZA,
        detalle_raza,
        status_raza], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Cliente actualizado'});
            }else{
                console.log(err);
            }
        });
});



module.exports = router;