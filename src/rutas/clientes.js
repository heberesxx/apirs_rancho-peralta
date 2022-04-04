const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/personas', (req,res)=>{
    mysqlConnection.query('SELECT * FROM MP_PERSONA', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/proveedores', (req,res)=>{
    mysqlConnection.query('SELECT * FROM PROVEEDORES', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/login/:NOM_USUARIO/:CLA_ACCESO', (req,res)=>{
    const reqQuery = req.params;
    const usuario = { NOM_USUARIO:reqQuery.NOM_USUARIO}
    const clave = { CLA_ACCESO:reqQuery.CLA_ACCESO}
    mysqlConnection.query('SELECT * FROM USUARIOS_REGISTRADOS WHERE ? AND ?',[usuario,clave], (err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});


router.get('/VistaClientes', (req,res)=>{
    mysqlConnection.query('SELECT * FROM CLIENTES_REGISTRADOS', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});


router.get('/telefonos', (req,res)=>{
    mysqlConnection.query('select  * FROM mp_telefono', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/roles', (req,res)=>{
    mysqlConnection.query('select  * FROM roles', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

      

router.get('/usuarios', (req,res)=>{
    mysqlConnection.query('select  * FROM usuarios_registrados', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/perfil/:COD_PERSONA', (req,res)=>{
    const { COD_PERSONA } = req.params;
    mysqlConnection.query('select  * FROM PERFIL WHERE COD_PERSONA = ?', [COD_PERSONA],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/personas/:cod', (req,res)=>{
    const { cod } = req.params;
    mysqlConnection.query('SELECT * FROM MP_PERSONA WHERE COD_PERSONA = ?', [cod],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})
router.get('/mostrar_cliente/:COD_CLIENTE', (req,res)=>{
    const { COD_CLIENTE } = req.params;
    mysqlConnection.query('SELECT * FROM CLIENTES_REGISTRADOS WHERE COD_CLIENTE = ?', [COD_CLIENTE],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})


router.post('/insertarpersona', (req,res)=>{
    const {primer_nombre,   
        primer_apellido,
        ID_CLIENTE,
        sexo_cliente,
        fecha_nacimiento,
        direccion,
        numero_area,
        NUM_CELULAR,
        numero_telefono
    } = req.body;

    const query=`CALL INS_CLIENTE(?,?,?,?,?,?,?,?,?);
    `;
    mysqlConnection.query(query, [primer_nombre,   
        primer_apellido,
        ID_CLIENTE,
        sexo_cliente,
        fecha_nacimiento,
        direccion,
        numero_area,
        NUM_CELULAR,
        numero_telefono], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Persona registrada'});
            }else{
                console.log(err);
            }
        });
});


router.put('/actualizarcliente/:COD_CLIENTE', (req,res)=>{
    const {primer_nombre,   
        primer_apellido,
        ID_CLIENTE,
        sexo_cliente,
        fecha_nacimiento,
        direccion,
        numero_area,
        NUM_CELULAR,
        numero_telefono,
        IND_COMERCIAL

    } = req.body;
    const {COD_CLIENTE} = req.params;
    const query=`CALL UPD_CLIENTE(?,?,?,?,?,?,?,?,?,?,?);
    `;
    mysqlConnection.query(query, [COD_CLIENTE,
        primer_nombre,   
        primer_apellido,
        ID_CLIENTE,
        sexo_cliente,
        fecha_nacimiento,
        direccion,  
        numero_area,
        NUM_CELULAR,
        numero_telefono,
        IND_COMERCIAL], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Cliente actualizado'});
            }else{
                console.log(err);
            }
        });
});

router.delete('/deletepersona/:COD_PERSONA', (req,res)=>{
    const {COD_PERSONA} = req.params;

    const query=`CALL DEL_PERSONA(?);
    `;
    mysqlConnection.query(query, [COD_PERSONA], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Persona borrada'});
            }else{
                console.log(err);
            }
        });
        console.log(COD_PERSONA)
});

router.get('/ver_pregunta/:resp', (req,res)=>{
    const {resp} = req.params;
    mysqlConnection.query('SELECT * FROM ver_preguntas WHERE respuesta = ? ', [resp],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.put('/actualizarrespuesta/:id_usuario', (req,res)=>{
    const {
        id,
        respuesta

    } = req.body;
    const {id_usuario} = req.params;
    const query=`CALL upd_respuesta(?,?,?);
    `;
    mysqlConnection.query(query, [id_usuario,id,respuesta
        ], (err,rows,fields)=>{
            if(!err){
                res.json({Status: 'Cliente actualizado'});
            }else{
                console.log(err);
            }
        });
});

module.exports = router;