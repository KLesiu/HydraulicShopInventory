const express = require("express")
const router = express.Router()

// Require controller modules.
const products_controller = require("../controllers/products")

// Get catalog home page
router.get("/", products_controller.index)



module.exports = router