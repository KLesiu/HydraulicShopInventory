const Chuck = require("../models/chucks")
const Muff = require("../models/muffs")
const Node = require("../models/nodes")
const Plug = require("../models/plugs")
const Screw = require("../models/screws")
const Tee = require("../models/tees")
const asyncHandler = require("express-async-handler")

exports.index = asyncHandler(async (req,res,next)=>{
// Get details of chucks, muffs, nodes, plugs, screws and tees then genre counts (in parallel)
    const [
        numChucks,
        numMuffs,
        numNodes,
        numPlugs,
        numScrews,
        numTees
    ]= await Promise.all([
        Chuck.countDocuments({availability:
            true}).exec(),
        Muff.countDocuments({availability:
            true}).exec(),
        Node.countDocuments({availability:
            true}).exec(),
        Plug.countDocuments({availability:
            true}).exec(),
        Screw.countDocuments({availability:
            true}).exec(),
        Tee.countDocuments({availability:
            true}).exec(),
        
    ])
    res.render("index",{
        title: "HiA - Main Page",
        chucks_count: numChucks,
        muffs_count: numMuffs,
        nodes_count : numNodes,
        plugs_count : numPlugs,
        screws_count : numScrews,
        tees_count: numTees
    })
})