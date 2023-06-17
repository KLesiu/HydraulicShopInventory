const {body, validationResult} =require('express-validator')
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
        quantity: plug.quantity,
        url: plug.url

    })
})


// Display Plug create form on GET
exports.plug_create_get=(req,res,next)=>{
    res.render("plug_form",{title:"Create Plug",errors: {}})
}

// Process request after validation and sanitization
exports.plug_create_post=[
    body("name","Name must not be empty").trim().isLength({min:1}).escape(),
    body("material","Material must not be empty").trim().isLength({min:1}).escape(),
    body("price","Price must not be empty, must be a number").isFloat(),
    body("size","Size must not be empty, must be a number").isInt(),
    body("quantity","Quantity must not be a number").isInt(),
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)
        let avail = false
        if(req.body.quantity>0){
            avail=true
        }
        const plug = new Plug({
            name:req.body.name,
            material:req.body.material,
            price:req.body.price,
            size:req.body.size,
            availability:avail,
            quantity:req.body.quantity
        })
        if(!errors.isEmpty()){
            res.render("plug_form",{
                title:"Create Plug",
                errors: errors.array()
            })
            return
        }else{
            await plug.save()
            res.redirect(plug.url)
        }
    })
]


// Delete Plug GET
exports.plug_delete_get= asyncHandler(async(req,res,next)=>{
    const plug = await Plug.findById(req.params.id).exec()
    if(plug === null){
        // No results
        res.redirect("/catalog/plugs")
    }
    res.render("plug_delete",{
        title: "Delete Plug",
        plug: plug
    })
})

// Handle Plug on POST
exports.plug_delete_post = asyncHandler(async(req,res,next)=>{
    await Plug.findByIdAndRemove(req.body.id)
    res.redirect("/catalog/plugs")
})
