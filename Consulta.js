const {schema, model, Schema} = require ('mongoose');

const consultaSchema = new Schema({
    id_Consulta:{
        type:String,
        require:true,
        unique:true
    },
    Fecha_Consulta: String,
    id_Mascota: String,
    Veterinario: String,
    Diagnostico: String,
    Tratamiento: String
}, {
    versionKey:false,
    timestamps:true
});
module.exports = model('consulta',consultaSchema);