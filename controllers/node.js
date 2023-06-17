const {body, validationResult} =require('express-validator')
const Node = require('../models/nodes')
const asyncHandler = require('express-async-handler')


// Display list of all Nodes
exports.nodes_list = asyncHandler(async (req,res,next)=>{
    const allNodes = await Node.find().exec()
    res.render("nodes_list",{
        title: 'Nodes List',
        node_list : allNodes
    })
})

// Display one Node detail
exports.node_detail = asyncHandler(async (req,res,next)=>{
    const node = await Node.findById(req.params.id).exec()
    if (node === null){
        // No results
        const err = new Error('Node not found')
        err.status = 404
        return next(err)
    }
    res.render("node_detail",{
        title: `Detail ${node.name}`,
        name: node.name,
        type: node.type,
        material: node.material,
        price: node.price,
        fi: node.fi,
        availability: node.availability,
        quantity: node.quantity

    })
})

// Display Node create form on GET
exports.node_create_get=(req,res,next)=>{
    res.render("node_form",{title: "Create Node", errors: {}})
}

// Process request after validation and sanitization
exports.node_create_post = [
    body("name","Name must not be empty").trim().isLength({min:1}).escape(),
    body("type","Type must not be empty").trim().isLength({min:1}).escape(),
    body("material","Material must not be empty").trim().isLength({min:1}).escape(),
    body("price","Price must not be empty, must be a number").isFloat(),
    body("fi","Fi must not be empty").trim(),
    body("quantity","Quantity must not be empty, must be a number").isInt(),
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)
        let avail = false
        if(req.body.quantity>0){
            avail = true
        }
        const node = new Node({
            name: req.body.name,
            type: req.body.type,
            material: req.body.material,
            price: req.body.price,
            fi: req.body.fi,
            availability: avail,
            quantity: req.body.quantity
        })
        if(!errors.isEmpty()){
            res.render("node_form",{
                title: "Create Node",
                errors: errors.array()
            })
            return
        }else{
            await node.save()
            res.redirect(node.url)
        }
    })

]