const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');
//VER TODAS LAS VACAS PREÑADAS
router.get('/vaca_prenada', (req,res)=>{
    mysqlConnection.query('SELECT * FROM VACAS_PRENADAS_EMBRION', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});



router.get('/mostrar_vacaprenada/:COD_PRENADA_EMBRION', (req,res)=>{
    const { COD_PRENADA_EMBRION } = req.params;
    mysqlConnection.query('SELECT * FROM VACAS_PRENADAS_EMBRION WHERE COD_PRENADA_EMBRION = ?', [COD_PRENADA_EMBRION],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})
/*ACTUALIZAR UNA VACA PREÑADA
router.put('/actualizar-vaca-prenada/:COD_VACA_PRENADA', (req,res)=>{
    const {FEC_PARIR,
        OBS_VACAP,
        IND_PRENADA} = req.body;
        const {COD_VACA_PRENADA} = req.params;
    const query=`CALL UPD_VACA_PRENADA(?,?,?,?);
    `;
    mysqlConnection.query(query, [COD_VACA_PRENADA,
        FEC_PARIR,
        OBS_VACAP,
        IND_PRENADA], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Vaca preñada actualizada'});
            }else{
                console.log(err);
            }
        });
});*/




router.get('/vaca_prenada_embrion/:COD_PRENADA_EMBRION', (req,res)=>{
    const {COD_PRENADA_EMBRION} = req.params;
    mysqlConnection.query('SELECT * FROM VACAS_PRENADAS_EMBRION WHERE COD_PRENADA_EMBRION = ?', [COD_PRENADA_EMBRION],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.put('/actualizar-vacap-embrion/:COD_PRENADA_EMBRION', (req,res)=>{
    const {FEC_PARIR,
        OBS_VACAP,
        IND_PRENADA
    } = req.body;
    const {COD_PRENADA_EMBRION} = req.params;
    const query=`CALL UPD_VACAP_EMBRION(?,?,?,?);
    `;
    mysqlConnection.query(query, [COD_PRENADA_EMBRION,
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