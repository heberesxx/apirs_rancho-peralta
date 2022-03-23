const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//VER TODAS LOS NACIMIENTOS
router.get('/nacimientos', (req,res)=>{
    mysqlConnection.query('SELECT * FROM nacimientos_embrion', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/mostrar_nacimiento/:COD_NACIMIENTO_EMBRION', (req,res)=>{
    const { COD_NACIMIENTO_EMBRION } = req.params;
    mysqlConnection.query('SELECT * FROM nacimientos_embrion WHERE COD_NACIMIENTO_EMBRION = ?', [COD_NACIMIENTO_EMBRION],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})


//REGISTRAR UN NUEVO NACIMIENTO
router.post('/registrar-nacimiento', (req,res)=>{
    const {NUM_ARETE,
        NOM_GANADO,
        CLR_GANADO,
        COD_ESTADO,
        COD_LUGAR,
        PES_ACTUAL,
        FIE_GANADO,
        COD_RAZA,
        SEX_GANADO,
        COD_PRENADA_EMBRION,
    FEC_NACIMIENTO} = req.body;
    const query=`CALL INS_NACIMIENTO_EMBRION(?,?,?,?,?,?,?,?,?,?,?
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
        COD_PRENADA_EMBRION,
        FEC_NACIMIENTO], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Nacimiento Registrado'});
            }else{
                console.log(err);
            }
        });
});

router.get('/vacas-recien-paridas', (req,res)=>{
    mysqlConnection.query('SELECT * FROM recienparidas_embrion', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});
module.exports = router;