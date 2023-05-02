const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const app=express();
const Cliente = require('./Cliente');

//Settings 
app.set('port',process.env.PORT||3600);
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));

app.listen(app.get('port'),()=>{
    console.log('Servidor en el pueto: ' + app.get('port'));
});

//Middlewares
app.use(morgan('dev'));
app.use(express.json()); 

//Conexión a mongodb atlas
mongoose.connect('mongodb+srv://albertofw70:J&j240522@clusterjesus.40themc.mongodb.net/Veterinariadb?retryWrites=true&w=majority')
.then(db=> console.log("Mongodb Atlas Conectado"))
.catch(err=> console.error(err));

//Traer todos los Clientes
app.get("/verClientes",async (req, res)=>{
    const clientes = await Cliente.find();
    res.render('Clientes', {clientes});
});

//Insertar nuevos Clientes
app.post("/insertarCliente",async(req,res)=>{
    const ClienteInsertado = new Cliente(req.body);
    await ClienteInsertado.save();
    res.redirect("/verClientes");
});

//Elimina todas las ventas
app.get("/eliminarClientes", async(req, res) =>{
    await Cliente.deleteMany();
    res.redirect("/verClientes");
});