const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ScrewsSchema = new Schema({
    name: {type: String, maxLength: 100, required: true},
    type: {type:String, required:true, maxLength:100},
    material : {type:String, maxLength: 100, required: true},
    price: {type: Number, required: true },
    size: {type:String,required:true,maxLength: 100}
})

ScrewsSchema.virtual("url").get(function(){
    return `/catalog/screws/${this.id}`
})

module.exports = mongoose.model("Screws", ScrewsSchema)