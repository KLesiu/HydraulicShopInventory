const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MuffsSchema = new Schema({
    name: {type: String, maxLength: 100, required: true},
    type: {type:String, required:true, maxLength:100},
    material : {type:String, maxLength: 100, required: true},
    price: {type: Number, required: true },
    availability: {type: Boolean,required:true},
    quantity:{type:Number,required:true}
})

MuffsSchema.virtual("url").get(function(){
    return `/catalog/muffs/${this.id}`
})

module.exports = mongoose.model("Muffs",MuffsSchema)