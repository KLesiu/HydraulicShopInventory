const Muff = require("../models/muffs")
const asyncHandler =  require("express-async-handler")

//Display list of all Chucks
exports.muffs_list = asyncHandler(async (req,res,next)=>{
    const allMuffs = await Muff.find().exec()
    res.render("muffs_list",{
        title: "Muffs List",
        muff_list: allMuffs
    })
})

//Display one Muff detail
exports.muff_detail = asyncHandler(async (req,res,next)=>{
    const muff = await Muff.findById(req.params.id).exec()
    if(muff === null){
        // No results
        const err = new Error('Muff not found')
        err.status = 404
        return next(err)

    }
    res.render("muff_detail",{
        title: `Detail: ${muff.name}`,
        name: muff.name,
        type: muff.type,
        material: muff.material,
        price: muff.price,
        availability: muff.availability,
        quantity: muff.quantity

    })
})