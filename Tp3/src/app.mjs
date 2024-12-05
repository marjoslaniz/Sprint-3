import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
//import superHeroRoutes from './routes/superHeroRoute.mjs';
import router from './routes/superHeroRoute.mjs';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';

const app = express(); //Inicializamos una aplicacion de Express
const PORT = process.env.PORT || 3000; 


app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));//directorio de las vistas
app.use(expressEjsLayouts);
app.set('layout', 'layout');
app.use(express.static(path.resolve('public')));//servir archivos estáticos
app.use(express.json());
app.use(express.urlencoded({extend: true}));

const loggerMiddleware =  (req, res, next) => {
    console.log(`Request recibida: ${req.method} ${req.url}`);
    next(); //pasa el control al siguiente middleware
}
//middleware para PARSEAR JSON

//app.use(express.json());
app.use(loggerMiddleware);

//Conexion a MongoDB
connectDB(); //Conectamos a la base de datos de MongoDB

//Configracion de Rutas
app.use('/api', router);


//Manejo de errores para rutas no encontradas
/*app.use((req, res, next) => {
        res.status(404).send({mensaje:"Ruta no encontrada"});
});*/

//Iniciar el servidor
app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
