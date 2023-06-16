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