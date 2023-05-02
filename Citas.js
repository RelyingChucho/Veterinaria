const {schema, model, Schema} = require ('mongoose');

const citaSchema = new Schema({
    IdCita:{
        type:String,
        require:true,
        unique:true
    },
    fecha_cita:Date,
    nombre_mascota:String,
    raza:String,
    edad:Number,
    numero_cuarto: String,
    veterinario: String,
    nombre_dueño:String
}, {
    versionKey:false,
    timestamps:true
});
module.exports = model('cita', citaSchema);