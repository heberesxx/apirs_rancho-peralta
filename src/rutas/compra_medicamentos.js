const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');




router.get('/compra-medicamento/:cod_compra_medicamento', (req, res) => {
    const { cod_compra_medicamento } = req.params;
    mysqlConnection.query('SELECT * FROM tbl_pr_compra_medicamento WHERE cod_compra_medicamento = ?', [cod_compra_medicamento], (err,rows, fields) =>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
} );


router.post('/agregar-compra-medicamento', (req, res) =>{
    const { 
        COD_MEDICAMENTO,   
        CAN_MEDICAMENTO
    } = req.body;
    console.log(req.body)
    const query = ` CALL INS_COMPRA_MEDICAMENTO(?,?);
    `;
    mysqlConnection.query(query, [
        COD_MEDICAMENTO,   
        CAN_MEDICAMENTO],
        (err,rows,fields) => {
            if(!err){
                res.json({Status: 'Compra Registrada'});
            }else {
                console.log(err);
            }
        });
});

router.get("/detalle_lote_medicamento", (req, res) => {
    const query = "CALL READ_LOTE_MEDICAMENTO()";
    mysqlConnection.query(query, (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
        return;
      }
    });
  });

  router.delete("/eliminaritem_medicamento/:COD_DETALLE_LOTE", (req, res) => {
    const { COD_DETALLE_LOTE } = req.params;
  
    const query = ` CALL DEL_DETALLE_LOTE_MEDICAMENTO(?);
        `;
    mysqlConnection.query(query, [COD_DETALLE_LOTE], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Dato borrado" });
      } else {
        console.log(err);
      }
    });
    console.log(COD_DETALLE_LOTE);
  });

  router.post("/confirmarlote_medicamento", (req, res) => {
    const query = `
        
        CALL CONFIRMAR_LOTE_MEDICAMENTO();
      `;
    mysqlConnection.query(query, (err, rows, fields) => {
      if (!err) {
        res.json({ status: "GUARDADO EN COMPRA GANADO" });
      } else {
        console.log(err);
      }
    });
  });

  router.get('/mostrar_lote_medicamento/:COD_COMPRA_MEDICAMENTO', (req,res)=>{
    const { COD_COMPRA_MEDICAMENTO } = req.params;
    mysqlConnection.query('SELECT * FROM detalle_lote_medicamento WHERE COD_COMPRA_MEDICAMENTO = ?', [COD_COMPRA_MEDICAMENTO],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
  })

  router.put("/cancelar_lote_medicamento/:COD_COMPRA_MEDICAMENTO", (req, res) => {
    const { COD_COMPRA_MEDICAMENTO } = req.params;
  
    const query = `CALL CANCELAR_LOTE_MEDICAMENTO(?);`;
    mysqlConnection.query(query, [COD_COMPRA_MEDICAMENTO], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Ganado Actualizado" });
      } else {
        console.log(err);
      }
    });
  });
router.put('/actualizar-compra-medicamento/:COD_COMPRA_MEDICAMENTO', (req, res) => {
    const {
        COD_MEDICAMENTO,  
        CAN_MEDICAMENTO,  
        PRE_UNITARIO,
        FEC_VENCIMIENTO,
        FEC_COMPRA,
        COD_PERSONA
    } = req.body;
    const {COD_COMPRA_MEDICAMENTO} = req.params;
    const query = 'CALL UPDATE_COMPRA_MEDICAMENTO(?, ?, ?, ?, ?, ?, ?);';
    mysqlConnection.query(query, [
        COD_COMPRA_MEDICAMENTO,
        COD_MEDICAMENTO,  
        CAN_MEDICAMENTO,  
        PRE_UNITARIO,
        FEC_VENCIMIENTO,
        FEC_COMPRA,
        COD_PERSONA],
    (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Registro de compra actualizado'});
        }else {
            console.log(err);
        }
    });
});

module.exports = router;