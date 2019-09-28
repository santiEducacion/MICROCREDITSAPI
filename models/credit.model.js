let mongoose = require("mongoose")

let Schema = mongoose.Schema

let creditSchema = new Schema({

    usuario:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    valor:{
        type: Number,
        required: true
    },

    plazo: {
        type: Number,
        required: true
    },

    interes:{
        type:Number,
    },

    cuota_mensual:{
        type:Number,
    },

    Solicitud: {
        type:Boolean,
    },

    aprobado:{
        type: Boolean,
        required: false
    },

    fecha_solicitud:{
        type:Date,
        default: Date.now
    },

    fecha_aprobación:{
        type:Date,
    }
})

module.exports = mongoose.model('Credit', creditSchema)