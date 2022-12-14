const express = require("express")
const router = express.Router()

const SupplierController = require("./controllers/supplier-controller")
const ProductController = require("./controllers/product-controller")
const StockHistoryController = require("./controllers/stock-history-controller")
const UserController = require("./controllers/user-controller")
const TagController = require("./controllers/tag-controller")
//POST

//SUPPLIER
router.post("/create-supplier", async function (req, res, next) {
  try {
    const response = await SupplierController.createSupplier(req.body)
    res.status(200)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
router.post("/get-suppliers", async function (req, res, next) {
  try {
    const response = await SupplierController.getSuppliers()
    res.status(200)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
router.post("/delete-supplier", async function (req, res, next) {
  try {
    const response = await SupplierController.deleteSupplier(req.body)
    res.status(200)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
router.post("/update-supplier", async function (req, res, next) {
  try {
    const response = await SupplierController.updateSupplier(req.body)
    res.status(200)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
//PRODUCT
router.post("/create-product", async function (req, res, next) {
  try {
    const response = await ProductController.createProduct(req.body)
    res.status(200)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
router.post("/get-products", async function (req, res, next) {
  try {
    const response = await ProductController.getProducts()
    res.status(200)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
router.post("/delete-product", async function (req, res, next) {
  try {
    const response = await ProductController.deleteProduct(req.body)
    res.status(200)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
router.post("/update-product", async function (req, res, next) {
  try {
    const response = await ProductController.updateProducts(req.body)
    res.status(200)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
router.post("/get-product-infos", async function (req, res, next) {
  try {
    const response = await ProductController.getProductInfos()
    res.status(200)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
router.post("/delete-product", async function (req, res, next) {
  try {
    const response = await ProductController.deleteProduct(req.body)
    res.status(200)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
//STOCK HISTORY
router.post("/get-stock-history-per-week", async function (req, res, next) {
  try {
    const response = await StockHistoryController.getStockHistoryPerWeek()
    res.status(200)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
router.post("/create-stock-history", async function (req, res, next) {
  try {
    const response = await StockHistoryController.createStockHistory(req.body)
    res.status(200)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
router.post("/get-stock-history", async function (req, res, next) {
  try {
    const response = await StockHistoryController.getStockHistory()
    res.status(200)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
//USER CONTROLLER
router.post("/verify-if-user-is-admin", async function (req, res, next) {
  try {
    const response = await UserController.verifyIfUserIsAdmin(req.body)
    res.status(200)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

// TAG
router.get("/tag", async (req, res, next) => {
  try {
    const response = await TagController.getAllTags()
    res.status(200)
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.get("/tag/:tagId", async (req, res, next) => {
  try {
    const response = await TagController.getTag(req.params.tagId)
    res.status(200)
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.post("/tag", async (req, res, next) => {
  try {
    const response = await TagController.createTag(req.body)
    res.status(200)
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.delete("/tag/:tagId", async (req, res, next) => {
  try {
    const response = await TagController.deleteTag(req.params.tagId)
    res.status(200)
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.post("/tag/rfid", async (req, res, next) => {
  try {
    const response = await TagController.rfid(req.body)
    res.status(200)
    res.json(response)
  } catch (err) {
    next(err)
  }
})

module.exports = router
