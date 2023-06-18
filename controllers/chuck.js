const { body, validationResult } = require("express-validator");
const Chuck = require("../models/chucks")
const asyncHandler = require("express-async-handler")


// Display list of all Chucks
exports.chucks_list = asyncHandler(async (req,res,next)=>{
    const allChucks = await Chuck.find().exec()
    res.render("chucks_list",{
        title: "Chucks List",
        chuck_list : allChucks
    })
})

// Display one Chuck detail
exports.chuck_detail = asyncHandler(async (req,res,next)=>{
   const chuck = await Chuck.findById(req.params.id).exec()
   if (chuck === null){
    // No results
    const err = new Error('Chuck not found')
    err.status = 404
    return next(err)

   }
   res.render("chuck_detail",{
    title: `Detail: ${chuck.name}`,
    name: chuck.name,
    material : chuck.material,
    price: chuck.price,
    size: chuck.size,
    r: chuck.r,
    availability: chuck.availability,
    quantity: chuck.quantity,
    url: chuck.url
   })
})

// Display Chuck create form on GET
exports.chuck_create_get= (req,res,next)=>{
    res.render("chuck_form",{title: "Create Chuck", errors: {},update: false})
}

 // Process request after validation and sanitization.
 exports.chuck_create_post=[
    body("name","Name must not be empty").trim().isLength({min:1}).escape(),
    body("material","Material must not be empty").trim().isLength({min:1}).escape(),
    body("price","Price must not be empty, must be a number").isFloat(),
    body("size","Size must not be empty").notEmpty(),
    body("r","R must not be empty").trim().isLength({min:1}).escape(),
    body("quantity","Quantity must not be empty, must be a number").isInt(),
    asyncHandler(async(req,res,next)=>{
        const errors= validationResult(req)
        let avail = false
        if(req.body.quantity>0){
            avail=true
        }
        const chuck = new Chuck({
            name:req.body.name,
            material: req.body.material,
            price: req.body.price,
            size: req.body.size,
            r: req.body.r,
            availability: avail,
            quantity: req.body.quantity
        })
        if(!errors.isEmpty()){
            res.render("chuck_form",{
                title: "Create Chuck",
                errors: errors.array(),
                update: false
            })
            return
        }else{
            await chuck.save()
            res.redirect(chuck.url)
        }
           
        
    })
 ]


 // Delete Chuck GET
 exports.chuck_delete_get=asyncHandler(async(req,res,next)=>{
    const chuck = await Chuck.findById(req.params.id).exec()
    if(chuck === null){
        // No results
        res.redirect("/catalog/chucks")
    }
    res.render("chuck_delete",{
        title: "Delete Chuck",
        chuck: chuck
    })
 })


// Handle Chuck on POST
exports.chuck_delete_post= asyncHandler(async(req,res,next)=>{
    await Chuck.findByIdAndRemove(req.body.id)
    res.redirect("/catalog/chucks")
})

// Display Chuck update form on GET
exports.chuck_update_get= asyncHandler(async(req,res,next)=>{
    const chuck = await Chuck.findById(req.params.id).exec()
    if(chuck === null){
        // No results
        const err = new Error("Chuck not found")
        err.status = 404
        return next(err)
    }
    res.render("chuck_form",{
        title: "Update Chuck",
        chuck: chuck,
        errors: {},
        update: true
    })
})

// Handle Chuck update on POST
exports.chuck_update_post=[
    body("name","Name must not be empty").trim().isLength({min:1}).escape(),
    body("material","Material must not be empty").trim().isLength({min:1}).escape(),
    body("price","Price must not be empty, must be a number").isFloat(),
    body("size","Size must not be empty").notEmpty(),
    body("r","R must not be empty").trim().isLength({min:1}).escape(),
    body("quantity","Quantity must not be empty, must be a number").isInt(),
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)
        let avail = false
        if(req.body.quantity>0){
            avail=true
        }
        const chuck = new Chuck({
            name:req.body.name,
            material: req.body.material,
            price: req.body.price,
            size: req.body.size,
            r: req.body.r,
            availability: avail,
            quantity: req.body.quantity,
            _id: req.params.id
        })
        if (!errors.isEmpty()){
            res.render("chuck_form",{
                title: "Update Chuck",
                chuck: chuck,
               
                errors: errors.array(),
                update: true
            })
            return
        }else{
            await Chuck.findByIdAndUpdate(req.params.id,chuck)
            res.redirect(chuck.url)
        }
    })
]