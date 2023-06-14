const express = require("express")
const router = express.Router()

// Require controller modules.
const products_controller = require("../controllers/products")
const chuck_controller = require("../controllers/chuck")
// Get catalog home page
router.get("/", products_controller.index)


// Get request for list of all Chuck items
router.get("/chucks",chuck_controller.chucks_list)

// Get request for one Chuck
router.get("/chucks/:id", chuck_controller.chuck_detail)

module.exports = router