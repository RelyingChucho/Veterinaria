const {schema, model, Schema} = require ('mongoose');

const mascotaSchema = new Schema({
    id_Mascota:{
        type:String,
        require:true,
        unique:true
    },
    nombre: String,
    especie: String,
    raza: String,
    edad: String,
    historial_medico: String
}, {
    versionKey:false,
    timestamps:true
});
module.exports = model('mascota', mascotaSchema);