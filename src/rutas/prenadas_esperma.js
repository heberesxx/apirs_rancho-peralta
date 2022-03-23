const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/vaca_prenada_esperma', (req,res)=>{
    mysqlConnection.query('SELECT * FROM VACAS_PRENADAS_ESPERMA', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/mostrar_vacaprenada-esperma/:COD_PRENADA_ESPERMA', (req,res)=>{
    const { COD_PRENADA_ESPERMA } = req.params;
    mysqlConnection.query('SELECT * FROM VACAS_PRENADAS_ESPERMA WHERE COD_PRENADA_ESPERMA = ?', [COD_PRENADA_ESPERMA],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})

router.put('/actualizar-vacap-esperma/:COD_PRENADA_ESPERMA', (req,res)=>{
    const {FEC_PARIR,
        OBS_VACAP,
        IND_PRENADA
    } = req.body;
    const {COD_PRENADA_ESPERMA} = req.params;
    const query=`CALL UPD_VACAP_ESPERMA(?,?,?,?);
    `;
    mysqlConnection.query(query, [COD_PRENADA_ESPERMA,
        FEC_PARIR,
        OBS_VACAP,
        IND_PRENADA], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Vaca preñada actualizada'});
            }else{
                console.log(err);
            }
        });
});



module.exports = router;