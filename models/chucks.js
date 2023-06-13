const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChucksSchema= new Schema({
    name: {type: String, maxLength: 100, required: true},
    material : {type:String, maxLength: 100, required: true},
    price: {type: Number, required: true },
    size: {type: String, required:true},
    r: {type:String, required:false, maxLength: 100},
    availability: {type: Boolean,required:true},
    quantity:{type:Number,required:true}
})

ChucksSchema.virtual("url").get(function(){
    return `/catalog/chucks/${this.id}`;
})

module.exports= mongoose.model("Chucks", ChucksSchema)