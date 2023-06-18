const express = require("express")
const router = express.Router()

// Require controller modules.
const products_controller = require("../controllers/products")
const chuck_controller = require("../controllers/chuck")
const muff_controller = require('../controllers/muff')
const node_controller = require('../controllers/node')
const plug_controller = require('../controllers/plug')
const screw_controller = require('../controllers/screw')
const tee_controller = require('../controllers/tee')
// Get catalog home page
router.get("/", products_controller.index)


// Chucks

// Get request for list of all Chuck items
router.get("/chucks",chuck_controller.chucks_list)

// Get request for creating a Chuck
router.get('/chucks/create',chuck_controller.chuck_create_get)

// Post request for creating a Chuck
router.post('/chucks/create',chuck_controller.chuck_create_post)

// Get request to delete Chuck
router.get("/chucks/:id/delete",chuck_controller.chuck_delete_get)

// Post request to delete Chuck
router.post("/chucks/:id/delete",chuck_controller.chuck_delete_post)

// Get request to update Chuck
router.get("/chucks/:id/update",chuck_controller.chuck_update_get)

// Post request to update Chuck
router.post("/chucks/:id/update",chuck_controller.chuck_update_post)


// Get request for one Chuck
router.get("/chucks/:id", chuck_controller.chuck_detail)



// Muffs

// Get request for list of all Muff items
router.get('/muffs', muff_controller.muffs_list)

// Get request for creating a Muff
router.get('/muffs/create',muff_controller.muff_create_get)

// Post request for creating a Muff
router.post('/muffs/create',muff_controller.muff_create_post)

// Get request to delete Muff
router.get("/muffs/:id/delete",muff_controller.muff_delete_get)

// Post request to delete Muff
router.post("/muffs/:id/delete",muff_controller.muff_delete_post)

// Get request for one Muff
router.get("/muffs/:id",muff_controller.muff_detail)

// Nodes

// Get request for list of all Node items
router.get('/nodes',node_controller.nodes_list)

// Get request for creating a Node
router.get('/nodes/create',node_controller.node_create_get)

// Post request for creating a Node
router.post('/nodes/create',node_controller.node_create_post)

// Get request to delete Node
router.get("/nodes/:id/delete",node_controller.node_delete_get)

// Post request to delete Node
router.post("/nodes/:id/delete",node_controller.node_delete_post)

// Get request for one Node
router.get('/nodes/:id',node_controller.node_detail)

// Plugs

// Get request for list of all Plugs items
router.get('/plugs',plug_controller.plugs_list)

// Get request for creating a Plug
router.get('/plugs/create',plug_controller.plug_create_get)

// Post request for creating a Plug
router.post('/plugs/create',plug_controller.plug_create_post)

// Get request to delete Plug
router.get('/plugs/:id/delete',plug_controller.plug_delete_get)

// Post request to delete Plug
router.post("/plugs/:id/delete",plug_controller.plug_delete_post)

// Get request for one Plug
router.get('/plugs/:id',plug_controller.plug_detail)

// Screws

// Get request for list of all Screws item
router.get('/screws',screw_controller.screws_list)

// Get request for creating a Screw
router.get('/screws/create',screw_controller.screw_create_get)

// Post request for creating a Screw
router.post('/screws/create',screw_controller.screw_create_post)

// Get request to delete Screw
router.get("/screws/:id/delete",screw_controller.screw_delete_get)

// Post request to delete Screw
router.post("/screws/:id/delete",screw_controller.screw_delete_post)

// Get request for one Screw
router.get('/screws/:id',screw_controller.screw_detail)


// Tees

// Get request for list of all Tees item
router.get('/tees',tee_controller.tees_list)

// Get request for creating a Tee
router.get("/tees/create",tee_controller.tee_create_get)

// Post request for creating a Tee
router.post('/tees/create',tee_controller.tee_create_post)

// Get request to delete Tee
router.get("/tees/:id/delete",tee_controller.tee_delete_get)

// Post request to delete Tee
router.get("/tees/:id/delete",tee_controller.tee_delete_post)

// Get request for one Tee
router.get('/tees/:id',tee_controller.tee_detail)



module.exports = router