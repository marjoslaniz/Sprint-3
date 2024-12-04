import express from 'express';
import userRoutes from './routes/userRoutes.mjs';
const app = express(); //Inicializamos una aplicacion de Express
//const PORT = process.env.PORT || 3000; 

//middleware para PARSEAR JSON

//app.use(express.json());


app.set('view engine', 'ejs');

//Conexion a MongoDB
//connectDB(); //Conectamos a la base de datos de MongoDB

//Configracion de Rutas
app.use('/users', userRoutes);


//Manejo de errores para rutas no encontradas
/*app.use((req, res, next) => {
        res.status(404).send({mensaje:"Ruta no encontrada"});
});*/

//Iniciar el servidor
app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
});
