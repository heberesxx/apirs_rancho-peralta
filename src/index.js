const express = require('express');
const app = express();

//Configuraciones
app.set('port', process.env.PORT || 3001);

//Middlewares
app.use(express.json());

//Rutas
app.use(require('./rutas'));


//Iniciar el servidor

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});