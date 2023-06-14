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
    quantity: chuck.quantity
   })
})