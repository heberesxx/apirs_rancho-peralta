const express = require('express');
const app = express();
app.use(require('./rutas/prenadas_esperma'));
app.use(require('./rutas/prenadasmonta'));
app.use(require('./rutas/transmonta'));
app.use(require('./rutas/medicamento'));
app.use(require('./rutas/compra_medicamentos'));
app.use(require('./rutas/clientes'));
app.use(require('./rutas/proveedores'));
app.use(require('./rutas/compras'));
app.use(require('./rutas/ventas'));
app.use(require('./rutas/reportes'));
app.use(require('./rutas/ganado'));
app.use(require('./rutas/embrion'));
app.use(require('./rutas/vaca_prenada'));
app.use(require('./rutas/nacimientos'));
app.use(require('./rutas/nacimientos_esperma'));
app.use(require('./rutas/nacimientos_monta'));
app.use(require('./rutas/esperma'));
app.use(require('./rutas/orden_trabajo'));
app.use(require('./rutas/transembriones'));
app.use(require('./rutas/transesperma'));
app.use(require('./rutas/produccion_leche'));
app.use(require('./rutas/prenadasmonta'));
app.use(require('./rutas/estados'));
app.use(require('./rutas/lugares'));
app.use(require('./rutas/razas'));


module.exports = app;