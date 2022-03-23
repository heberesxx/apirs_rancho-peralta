const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//VER TODAS LOS NACIMIENTOS
router.get('/nacimientos_esperma', (req,res)=>{
    mysqlConnection.query('SELECT * FROM nacimientos_esperma', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/mostrar_nacimiento_esperma/:COD_NACIMIENTO_ESPERMA', (req,res)=>{
    const { COD_NACIMIENTO_ESPERMA } = req.params;
    mysqlConnection.query('SELECT * FROM nacimientos_esperma WHERE COD_NACIMIENTO_ESPERMA = ?', [COD_NACIMIENTO_ESPERMA],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})


//REGISTRAR UN NUEVO NACIMIENTO
router.post('/registrar-nacimiento-esperma', (req,res)=>{
    const {NUM_ARETE,
        NOM_GANADO,
        CLR_GANADO,
        COD_ESTADO,
        COD_LUGAR,
        PES_ACTUAL,
        FIE_GANADO,
        COD_RAZA,
        SEX_GANADO,
        COD_PRENADA_ESPERMA,
    FEC_NACIMIENTO} = req.body;
    const query=`CALL INS_NACIMIENTO_ESPERMA(?,?,?,?,?,?,?,?,?,?,?
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
        COD_PRENADA_ESPERMA,
        FEC_NACIMIENTO], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Nacimiento Registrado'});
            }else{
                console.log(err);
            }
        });
});

router.get('/recien-paridas-esperma', (req,res)=>{
    mysqlConnection.query('SELECT * FROM recienparidas_esperma', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});
module.exports = router;