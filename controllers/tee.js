const Tee = require('../models/tees')
const asyncHandler = require('express-async-handler')


// Display list of all Tees
exports.tees_list = asyncHandler(async (req,res,next)=>{
    const allTees = await Tee.find().exec()
    res.render('tees_list',{
        title: 'Tees List',
        tee_list: allTees
    })
})

// Display one Tee detail
exports.tee_detail = asyncHandler(async (req,res,next)=>{
    const tee = await Tee.findById(req.params.id).exec()
    if(tee === null){
        // No results
        const err = new Error('Tee not found')
        err.status = 404
        return next(err)
    }
    res.render('tee_detail',{
        title: `Detail: ${tee.name}`,
        name: tee.name,
        material : tee.material,
        price: tee.price,
        size: tee.size,
        availability: tee.availability,
        quantity: tee.quantity
    })
})