const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const app=express();
const Cliente = require('./Cliente');
const Mascota = require('./Mascota');

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

//Consultar un solo Cliente
app.get("/verCliente/:cb",async (req, res)=>{
    const cliente = await Cliente.findOne({id_Cliente:req.params.cb});
    res.render('EditarCliente', {cliente});
});

//Actualizar los Clientes
app.post("/actualizarCliente/:cb", async(req, res) =>{
    await Cliente.findOneAndUpdate({id_Cliente:req.params.cb}, req.body);
    res.redirect("/verClientes");
});

//Elimina todos los Clientes
app.get("/eliminarClientes", async(req, res) =>{
    await Cliente.deleteMany();
    res.redirect("/verClientes");
});

//Eliminar un Cliente
app.get("/eliminarCliente/:cb", async(req, res) =>{
    await Cliente.findOneAndDelete({id_Cliente:req.params.cb});
    res.redirect("/verClientes");
});

//----------------------------------MASCOTAS---------------------------------

//Traer todas las mascotas
app.get("/verMascotas",async (req, res)=>{
    const mascotas = await Mascota.find();
    res.render('Mascotas', {mascotas});
});

//Insertar Mascota llegada
app.post("/insertarMascota",async(req,res)=>{
    const mascotaInsert = new Mascota(req.body);
    await mascotaInsert.save();
    res.redirect("/verMascotas");
});

//Consultar una sola Mascota
app.get("/verMascota/:id",async (req, res)=>{
    const mascota = await Mascota.findOne({id_Mascota:req.params.id});
    res.render('EditarMascota', {mascota});
});

//Actualizar datos de Mascota
app.post("/actualizarMascota/:id", async(req, res) =>{
    await Mascota.findOneAndUpdate({id_Mascota:req.params.id}, req.body);
    res.redirect("/verMascotas");
});

//Elimina todas las Mascotas
app.get("/eliminarMascotas", async(req, res) =>{
    await Mascota.deleteMany();
    res.redirect("/verMascotas");
});

//Eliminar una mascota
app.get("/eliminarMascota/:id", async(req, res) =>{
    await Mascota.findOneAndDelete({id_Mascota:req.params.id});
    res.redirect("/verMascotas");
});

  // CITAS //    

//Agregar una nueva cita
app.post('/AgregarCita', async(req,res)=>{
    const citaAgregada = new Citas(req.body);
    await citaAgregada.save();
    res.redirect("/verCitas");
});

//Encontrar la cita de una mascota
app.get("/VerCitas/:cb",async (req, res)=>{
    const cita = await cita.findOne({idCita:req.params.cb});
    res.render('CitasExistentes', {cita});
});

//Modificar la cita de alguna de las mascotas
app.post("/modificarCita/:cb", async(req, res) =>{
    await cita.findOneAndUpdate({idCita:req.params.cb}, req.body);
    res.redirect("/verCitas");
});

//Elimina todas las citas
app.get("/eliminarCitas", async(req, res) =>{
    await cita.deleteMany();
    res.redirect("/verCitas");
});

//Eliminar una sola cita
app.get("/eliminarCita/:cb", async(req, res) =>{
    await cita.findOneAndDelete({idCita:req.params.cb});
    res.redirect("/verCitas");
});

