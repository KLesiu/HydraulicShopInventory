const Plug = require('../models/plugs')
const asyncHandler = require("express-async-handler")


// Display list of all Plugs
exports.plugs_list = asyncHandler(async (req,res,next)=>{
    const allPlugs = await Plug.find().exec()
    res.render("plugs_list",{
        title: 'Plugs List',
        plug_list : allPlugs
    })
})

// Display one Plug detail
exports.plug_detail = asyncHandler(async (req,res,next)=>{
    const plug = await Plug.findById(req.params.id).exec()
    if (plug === null){
        // No results
        const err = new Error ('Plug not found')
        err.status = 404
        return next(err)
    }
    res.render('plug_detail',{
        title: `Detail: ${plug.name}`,
        name: plug.name,
        material: plug.material,
        price: plug.price,
        size: plug.size,
        availability: plug.availability,
        quantity: plug.quantity

    })
})