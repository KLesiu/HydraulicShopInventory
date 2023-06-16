const express = require("express")
const router = express.Router()

// Require controller modules.
const products_controller = require("../controllers/products")
const chuck_controller = require("../controllers/chuck")
const muff_controller = require('../controllers/muff')
const node_controller = require('../controllers/node')
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

module.exports = router