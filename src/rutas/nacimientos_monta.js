const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//VER TODAS LOS NACIMIENTOS
router.get('/nacimientos_monta', (req,res)=>{
    mysqlConnection.query('SELECT * FROM nacimientos_monta', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/mostrar_nacimiento_monta/:COD_NACIMIENTO_MONTA', (req,res)=>{
    const { COD_NACIMIENTO_MONTA } = req.params;
    mysqlConnection.query('SELECT * FROM nacimientos_monta WHERE COD_NACIMIENTO_MONTA = ?', [COD_NACIMIENTO_MONTA],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})


//REGISTRAR UN NUEVO NACIMIENTO
router.post('/registrar-nacimiento-monta', (req,res)=>{
    const {NUM_ARETE,
        NOM_GANADO,
        CLR_GANADO,
        COD_ESTADO,
        COD_LUGAR,
        PES_ACTUAL,
        FIE_GANADO,
        COD_RAZA,
        SEX_GANADO,
        COD_PRENADA_MONTA,
    FEC_NACIMIENTO} = req.body;
    const query=`CALL INS_NACIMIENTO_MONTA(?,?,?,?,?,?,?,?,?,?,?
        );
    `;
    mysqlConnection.query(query, [NUM_ARETE,
        NOM_GANADO,
        CLR_GANADO,
        COD_ESTADO,
        COD_LUGAR,
        PES_ACTUAL,
        FIE_GANADO,
        COD_RAZA,
        SEX_GANADO,
        COD_PRENADA_MONTA,
        FEC_NACIMIENTO], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Nacimiento Registrado'});
            }else{
                console.log(err);
            }
        });
});

router.get('/recien-paridas-monta', (req,res)=>{
    mysqlConnection.query('SELECT * FROM recienparidas_monta', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});
module.exports = router;