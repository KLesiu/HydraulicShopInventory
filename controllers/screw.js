const {body, validationResult} =require('express-validator')
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

// Display Screw create form on GET
exports.screw_create_get=(req,res,next)=>{
    res.render("screw_form",{title: "Create Screw",errors:{}})
}

// Process request after validation and sanitization
exports.screw_create_post=[
    body("name","Name must not be empty").trim().isLength({min:1}).escape(),
    body("type","Type must not be empty").trim().isLength({min:1}).escape(),
    body("material","Material must not be empty").trim().isLength({min:1}).escape(),
    body("price","Price must not be empty, must be a number").isFloat(),
    body("size","Size must not be empty").trim().isLength({min:1}).trim(),
    body("quantity","Quantity must not be empty, must be a number").isInt(),
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)
        let avail = false
        if(req.body.quantity>0){
            avail = true
        }
        const screw = new Screw({
            name:req.body.name,
            type:req.body.type,
            material: req.body.material,
            price: req.body.price,
            size: req.body.size,
            availability: avail,
            quantity: req.body.quantity

        })
        if(!errors.isEmpty()){
            res.render("screw_form",{
                title: "Create Screw",
                errors: errors.array()
            })
            return
        }else{
            await screw.save()
            res.redirect(screw.url)
        }
    })

]