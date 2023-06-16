const Screw = require('../models/screws')
const asyncHandler = require('express-async-handler')


// Display list of all Screws
exports.screws_list = asyncHandler(async (req,res,next)=>{
    const allScrews = await Screw.find().exec()
    res.render("screws_list",{
        title: 'Screws List',
        screw_list : allScrews
    })
})

// Display one Screw detail
exports.screw_detail = asyncHandler(async (req,res,next)=>{
    const screw = await Screw.findById(req.params.id).exec()
    if (screw === null){
        // No results
        const err = new Error ('Screw not found')
        err.status = 404
        return next(err)
    }
    res.render('screw_detail', {
        title: `Detail: ${screw.name}`,
        name: screw.name,
        type: screw.type,
        material: screw.material,
        price: screw.price,
        size: screw.size,
        availability: screw.availability,
        quantity: screw.quantity

    })
})