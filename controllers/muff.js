const Muff = require("../models/muffs")
const {body, validationResult} =require('express-validator')
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
        quantity: muff.quantity,
        url: muff.url

    })
})

// Display Muff create form on GET
exports.muff_create_get=(req,res,next)=>{
    res.render("muff_form",{title: "Create Muff", errors: {},update:false})
}

// Process request after validation and sanitization
exports.muff_create_post = [
    body("name","Name must not be empty").trim().isLength({min:1}).escape(),
    body("type","Type must not be empty").trim().isLength({min:1}).escape(),
    body("material","Material must not be empty").trim().isLength({min:1}).escape(),
    body("price","Price must not be empty, must be a number").isFloat(),
    body("quantity","Quantity must not be empty, must be a number").isInt(),
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)
        let avail = false
        if(req.body.quantity>0){
            avail = true
        }
        const muff = new Muff({
            name: req.body.name,
            type: req.body.type,
            material: req.body.material,
            price: req.body.price,
            availability: avail,
            quantity: req.body.quantity,

            
        })
        if(!errors.isEmpty()){
            res.render("muff_form",{
                title: "Create Muff",
                errors: errors.array()
            })
            return
        }else{
            await muff.save()
            res.redirect(muff.url)
        }
    })

]


// Delete Muff GET
exports.muff_delete_get=asyncHandler(async(req,res,next)=>{
    const muff = await Muff.findById(req.params.id).exec()
    if(muff === null){
        // No results
        res.redirect("/catalog/muffs")
    }
    res.render("muff_delete",{
        title: "Delete Muff",
        muff: muff
    })
})

// Handle Muff on POST
exports.muff_delete_post=asyncHandler(async(req,res,next)=>{
    await Muff.findByIdAndRemove(req.body.id)
    res.redirect("/catalog/muffs")
})

// Display Muff update form on GET
exports.muff_update_get = asyncHandler(async(req,res,next)=>{
    const muff = await Muff.findById(req.params.id).exec()
    if (muff === null){
        // No results
        const err = new Error('Muff not found')
        err.status = 404
        return next(err)
    }
    res.render("muff_form",{
        title: "Update Muff",
        muff : muff,
        errors: {},
        update: true
    })
})

// Handle Muff update on POST
exports.muff_update_post=[
    body("name","Name must not be empty").trim().isLength({min:1}).escape(),
    body("type","Type must not be empty").trim().isLength({min:1}).escape(),
    body("material","Material must not be empty").trim().isLength({min:1}).escape(),
    body("price","Price must not be empty, must be a number").isFloat(),
    body("quantity","Quantity must not be empty, must be a number").isInt(), 
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)
        let avail = false
        if(req.body.quantity>0){
            avail = true
        }
        const muff = new Muff({
            name: req.body.name,
            type: req.body.type,
            material: req.body.material,
            price: req.body.price,
            availability: avail,
            quantity: req.body.quantity,
            _id : req.params.id
        })
        if(!errors.isEmpty()){
            res.render("muff_form",{
                title: "Update Muff",
                muff: muff,
                errors: errors.array(),
                update: true
            })
            return
        }else{
            await Muff.findByIdAndUpdate(req.params.id,muff)
            res.redirect(muff.url)
        }
    })
]