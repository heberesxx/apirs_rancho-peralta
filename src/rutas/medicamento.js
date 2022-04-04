const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/todos-medicamentos', (req,res) => {
    mysqlConnection.query('SELECT * FROM TBL_pr_medicamento', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    } );
});

router.get('/medicamento/:cod_medicamento', (req, res) => {
    const { cod_medicamento } = req.params;
    mysqlConnection.query('SELECT * FROM tbl_pr_medicamento WHERE cod_medicamento = ?', [cod_medicamento], (err,rows, fields) =>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
} );
+



router.get('/medicamentos_orden', (req,res) => {
    mysqlConnection.query('SELECT * FROM medicamento_orden', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    } );
});


router.post('/agregar-medicamento', (req, res) =>{
    const { 
        NOM_MEDICAMENTO,  
        ADM_MEDICAMENTO,  
        TRA_MEDICAMENTO,
        DOS_MEDICAMENTO,
        CAN_REORDEN
    } = req.body;
    console.log(req.body)
    const query = ` CALL INS_MEDICAMENTO(?, ? , ? , ?, ?);
    `;
    mysqlConnection.query(query, [
        NOM_MEDICAMENTO,  
        ADM_MEDICAMENTO,  
        TRA_MEDICAMENTO,
        DOS_MEDICAMENTO,
        CAN_REORDEN],
        (err,rows,fields) => {
            if(!err){
                res.json({Status: 'Medicamento Registrado'});
            }else {
                console.log(err);
            }
        });
});

router.put('/actualizar-medicamento/:COD_MEDICAMENTO', (req, res) => {
    const {
        NOM_MEDICAMENTO,  
        ADM_MEDICAMENTO,  
        TRA_MEDICAMENTO,
        DOS_MEDICAMENTO,
        CAN_REORDEN
    } = req.body;
    const {COD_MEDICAMENTO} = req.params;
    const query = 'CALL UPDATE_MEDICAMENTO(?, ?, ?, ?, ?, ?);';
    mysqlConnection.query(query, [
        COD_MEDICAMENTO,
        NOM_MEDICAMENTO,  
        ADM_MEDICAMENTO,  
        TRA_MEDICAMENTO,
        DOS_MEDICAMENTO,
        CAN_REORDEN],
    (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Medicamento actualizado'});
        }else {
            console.log(err);
        }
    });
});

module.exports = router;