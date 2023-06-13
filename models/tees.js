const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeesSchema = new Schema({
    name: {type: String, maxLength: 100, required: true},
    material : {type:String, maxLength: 100, required: true},
    price: {type: Number, required: true },
    size: {type: String, required:true},
    availability: {type: Boolean,required:true},
    quantity:{type:Number,required:true}
})


TeesSchema.virtual("url").get(function(){
    return `/catalog/tees/${this.id}`;
})

module.exports= mongoose.model("Tees", TeesSchema)