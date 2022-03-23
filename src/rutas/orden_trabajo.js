const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/todos-ordent', (req,res) => {
    mysqlConnection.query('SELECT * FROM MI_ORDENT', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    } );
});

router.get('/ordent/:cod_ordent', (req, res) => {
    const { cod_ordent } = req.params;
    mysqlConnection.query('SELECT * FROM mi_ordent WHERE cod_ordent = ?', [cod_ordent], (err,rows, fields) =>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
} );

router.get('/orden-trabajo', (req,res) => {
    mysqlConnection.query('SELECT * FROM ORDEN_TRABAJO', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    } );
});
router.post('/agregar-ordent', (req, res) =>{
    const { 
        COD_MEDICAMENTO,
        CAN_MEDICAMENTO
    } = req.body;
    console.log(req.body)
    const query = ` CALL INS_ORDENT(?, ?);
    `;
    mysqlConnection.query(query, [
        COD_MEDICAMENTO,
        CAN_MEDICAMENTO
    ],
        (err,rows,fields) => {
            if(!err){
                res.json({Status: 'Orden de trabajo Registrado'});
            }else {
                console.log(err);
            }
        });
});

module.exports = router;