import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
//import superHeroRoutes from './routes/superHeroRoute.mjs';
import router from './routes/superHeroRoute.mjs';

const app = express(); //Inicializamos una aplicacion de Express
const PORT = process.env.PORT || 3000; 

//middleware para PARSEAR JSON

app.use(express.json());

//Conexion a MongoDB
connectDB(); //Conectamos a la base de datos de MongoDB

//Configracion de Rutas
app.use('/api', router);

//Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
        res.status(404).send({mensaje:"Ruta no encontrada"});
});

//Iniciar el servidor
app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
