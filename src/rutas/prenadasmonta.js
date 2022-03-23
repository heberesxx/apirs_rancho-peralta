const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/vaca_prenada_monta', (req,res)=>{
    mysqlConnection.query('SELECT * FROM VACAS_PRENADAS_MONTA', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/mostrar_vacaprenada-monta/:COD_PRENADA_MONTA', (req,res)=>{
    const { COD_PRENADA_MONTA } = req.params;
    mysqlConnection.query('SELECT * FROM VACAS_PRENADAS_MONTA WHERE COD_PRENADA_MONTA = ?', [COD_PRENADA_MONTA],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})

router.put('/actualizar-vacap-monta/:COD_PRENADA_MONTA', (req,res)=>{
    const {

        FEC_PARIR,
        OBS_VACAP,
        IND_PRENADA
    } = req.body;
    const {COD_PRENADA_MONTA} = req.params;
    const query=`CALL UPD_VACAP_MONTA(?,?,?,?);
    `;
    mysqlConnection.query(query, [COD_PRENADA_MONTA,

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