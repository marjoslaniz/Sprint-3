import express from 'express';
const app = express(); //Inicializamos una aplicacion de Express
//const PORT = process.env.PORT || 3000; 

//middleware para PARSEAR JSON

//app.use(express.json());

app.set('view engine', 'ejs');

//Conexion a MongoDB
//connectDB(); //Conectamos a la base de datos de MongoDB

//Configracion de Rutas
//app.use('/api', router);
app.get('/greeting',(req,res) => {
    const name="Carlos";
    res.render('greeting',{name});
});

app.get('/products',(req,res) => {
    const products =[
        {name:'Laptop',price:1500},
        {name:'Smartphone', price:700},
        {name:'Tablet', price:300},
    ];
res.render('products',{products});
});

app.get('/principal', (req,res)=>{
    res.render('index3');
});
//Manejo de errores para rutas no encontradas
/*app.use((req, res, next) => {
        res.status(404).send({mensaje:"Ruta no encontrada"});
});*/

//Iniciar el servidor
app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
});
