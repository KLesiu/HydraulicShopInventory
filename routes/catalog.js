const express = require("express")
const router = express.Router()

// Require controller modules.
const products_controller = require("../controllers/products")
const chuck_controller = require("../controllers/chuck")
const muff_controller = require('../controllers/muff')
const node_controller = require('../controllers/node')
const plug_controller = require('../controllers/plug')
const screw_controller = require('../controllers/screw')
const screws = require("../models/screws")
// Get catalog home page
router.get("/", products_controller.index)


// Chucks

// Get request for list of all Chuck items
router.get("/chucks",chuck_controller.chucks_list)

// Get request for one Chuck
router.get("/chucks/:id", chuck_controller.chuck_detail)



// Muffs

// Get request for list of all Muff items
router.get('/muffs', muff_controller.muffs_list)

// Get request for one Muff
router.get("/muffs/:id",muff_controller.muff_detail)

// Nodes

// Get request for list of all Node items
router.get('/nodes',node_controller.nodes_list)

// Get request for one Node
router.get('/nodes/:id',node_controller.node_detail)

// Plugs

// Get request for list of all Plugs items
router.get('/plugs',plug_controller.plugs_list)

// Get request for one Plug
router.get('/plugs/:id',plug_controller.plug_detail)

// Screws

// Get request for list of all Screws item
router.get('/screws',screw_controller.screws_list)

// Get request for one Screw
router.get('/screws/:id',screw_controller.screw_detail)
module.exports = router