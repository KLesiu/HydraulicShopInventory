const mongoose = require("mongoose")

const Schema = mongoose.Schema

const NodesSchema = new Schema({
    name: {type: String, maxLength: 100, required: true},
    type: {type:String, required:true, maxLength:100},
    material : {type:String, maxLength: 100, required: true},
    price: {type: Number, required: true },
    fi: {type:String, required:true},
    availability: {type: Boolean,required:true},
    quantity:{type:Number,required:true}
})

NodesSchema.virtual("url").get(function(){
    return `/catalog/nodes/${this.id}`
})

module.exports = mongoose.model("Nodes", NodesSchema)