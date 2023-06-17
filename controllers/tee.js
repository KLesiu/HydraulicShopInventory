const {body, validationResult} =require('express-validator')
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
        quantity: tee.quantity,
        url: tee.url
    })
})

// Display Tee create form on GET
exports.tee_create_get= (req,res,next)=>{
    res.render("tee_form",{title: "Create Tee", errors:{}})
}

// Process request after validation and sanitization
exports.tee_create_post=[
    body("name","Name must not be empty").trim().isLength({min:1}).escape(),
    body("material","Material must not be empty").trim().isLength({min:1}).escape(),
    body("price","Price must not be empty, must be a number").isFloat(),
    body("size","Size must not be empty").trim().isLength({min:1}).escape(),
    body("quantity","Quantity must not be empty").isInt(),
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)
        let avail = false
        if(req.body.quantity>0){
            avail=true
        }
        const tee = new Tee({
            name: req.body.name,
            material: req.body.material,
            price: req.body.price,
            size: req.body.size,
            availability:avail,
            quantity:req.body.quantity
        })
        if(!errors.isEmpty()){
            res.render("tee_form",{
                title: "Create Tee",
                errors: errors.array()
            })
            return
        }else{
            await tee.save()
            res.redirect(tee.url)
        }
    })

]

// Delete Tee GET
exports.tee_delete_get= asyncHandler(async(req,res,next)=>{
    const tee = await Tee.findById(req.params.id).exec()
    if(tee===null){
        // No results
        res.redirect("/catalog/tees")
    }
    res.render("tee_delete",{
        title: "Delete Tee",
        tee: tee
    })
})

// Handle Tee on POST
exports.tee_delete_post=asyncHandler(async(req,res,next)=>{
    await Tee.findByIdAndRemove(req.body.id)
    res.redirect("/catalog/tees")
})