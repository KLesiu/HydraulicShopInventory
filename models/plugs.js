const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlugsSchema = new Schema({
    name: {type: String, maxLength: 100, required: true},
    material : {type:String, maxLength: 100, required: true},
    price: {type: Number, required: true },
    size: {type: Number, required:true},
})

PlugsSchema.virtual("url").get(function(){
    return `/catalog/plugs/${this.id}`
})

module.exports = mongoose.model("Plugs", PlugsSchema)