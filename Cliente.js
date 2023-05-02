const {scheema, model, Schema} = require ('mongoose');

const clienteSchema = new Schema({
    id_Cliente:{
        type:String,
        require:true,
        unique:true
    },
    nombre: String,
    apellido: String,
    direccion: String,
    telefono: String,
    correo: String
}, {
    versionKey:false,
    timestamps:true
});
module.exports = model('cliente', clienteSchema);