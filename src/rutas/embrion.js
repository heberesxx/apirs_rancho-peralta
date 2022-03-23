const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOSTRAR EMBRIÓN POR CÓDIGO
router.get('/embrion/:codigo', (req,res)=>{
    const { codigo } = req.params;
    mysqlConnection.query('SELECT * FROM TBL_MG_EMBRION WHERE COD_EMBRION = ?', [codigo],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

//INSERTAR UNA NUEVA COMPRA DE EMBRION
router.post('/insertarcompraembrion', (req,res)=>{
    const {
        raza_esperada,
        vaca_donadora,
        raza_donadora,
        raza_donador,
        toro_donador,
        precio_embrion,
        observacion_compra,
 } = req.body;
    const query=`CALL INS_COMPRA_EMBRION(?,?,?,?,?,?,?);
    `;
    mysqlConnection.query(query, [
        raza_esperada,
        vaca_donadora,
        raza_donadora,
        raza_donador,
        toro_donador,
        precio_embrion,
        observacion_compra,], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Compra registrada'});
            }else{
                console.log(err);
            }
        });
});

//MOSTRAR LAS COMPRAS REALIZADAS
router.get('/comprasembriones', (req,res)=>{
    mysqlConnection.query('SELECT * FROM TBL_MC_COMPRA_EMBRION', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get("/detalle_lote_embrion", (req, res) => {
    const query = "CALL READ_LOTE_EMBRION()";
    mysqlConnection.query(query, (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
        return;
      }
    });
  });

  router.post("/confirmarlote_embrion", (req, res) => {
    const query = `
        
        CALL CONFIRMAR_LOTE_EMBRION();
      `;
    mysqlConnection.query(query, (err, rows, fields) => {
      if (!err) {
        res.json({ status: "GUARDADO EN COMPRA GANADO" });
      } else {
        console.log(err);
      }
    });
  });

  router.get('/mostrar_loteembrion/:COD_COMPRA_EMBRION', (req,res)=>{
    const { COD_COMPRA_EMBRION } = req.params;
    mysqlConnection.query('SELECT * FROM compras_embriones WHERE COD_COMPRA_EMBRION = ?', [COD_COMPRA_EMBRION],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
  })

  router.put("/cancelar_loteembrion/:COD_COMPRA_EMBRION", (req, res) => {
    const { COD_COMPRA_EMBRION } = req.params;
  
    const query = `CALL CANCELAR_LOTE_EMBRION(?);`;
    mysqlConnection.query(query, [COD_COMPRA_EMBRION], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Ganado Actualizado" });
      } else {
        console.log(err);
      }
    });
  });
  
  router.delete("/eliminaritem_embrion/:COD_DETALLE_COMPRA", (req, res) => {
    const { COD_DETALLE_COMPRA } = req.params;
  
    const query = ` CALL DEL_DETALLE_COMPRA_EMBRION(?);
        `;
    mysqlConnection.query(query, [COD_DETALLE_COMPRA], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Dato borrado" });
      } else {
        console.log(err);
      }
    });
    console.log(COD_DETALLE_COMPRA);
  });

//ACTUALIZAR EL DETALLE DE UNA COMPRA DE EMBRIÓN
router.put('/actualizarcompraembrion', (req,res)=>{
    const {COD_EMBRION,
        OBS_COM_EMBRION,
        RAZ_VACA_DONADORA,
        RAZ_TORO_DONADOR,
        PRE_EMBRION
       } = req.body;
    const query=`CALL UPD_EMBRION(?,?,?,?,?);
    `;
    mysqlConnection.query(query, [COD_EMBRION,
        OBS_COM_EMBRION,
        RAZ_VACA_DONADORA,
        RAZ_TORO_DONADOR,
        PRE_EMBRION], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Compra Actualizada'});
            }else{
                console.log(err);
            }
        });
});

//REGISTRAR UNA NUEVA TRANSFERENCIA DE EMBRIÓN
router.post('/registrar-transferencia-embrion', (req,res)=>{
    const {COD_EMBRION,
        COD_REGISTRO_GANADO,
        IND_FECUNDACION
       } = req.body;
    const query=`CALL INS_TRANS_EMBRION(?,?,?);
    `;
    mysqlConnection.query(query, [COD_EMBRION,
        COD_REGISTRO_GANADO,
        IND_FECUNDACION], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Transferencia registrada'});
            }else{
                console.log(err);
            }
        });
});

//VER TODAS LAS TRANSFERENCIAS DE EMBRIONES REALIZADAS
//MOSTRAR LAS COMPRAS REALIZADAS
router.get('/transferencias-de-embriones', (req,res)=>{
    mysqlConnection.query('SELECT * FROM TRANS_EMBRION', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

//ACTUALIZAR UNA TRANSFERENCIA DE EMBRIONES
router.put('/actualizar-transferencia-embrion', (req,res)=>{
    const {V_COD_TRANS_EMBRION,
        V_IND_TRANS_EMBRION
       } = req.body;
    const query=`CALL UPD_TRANS_EMBRION(?,?);
    `;
    mysqlConnection.query(query, [V_COD_TRANS_EMBRION,
        V_IND_TRANS_EMBRION], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Transferencia actualizada'});
            }else{
                console.log(err);
            }
        });
});

//MOSTRAR LOS EMBRIONES COMPRADOS
router.get('/embrion', (req,res)=>{
    mysqlConnection.query('SELECT * FROM compras_embriones', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});



module.exports = router;