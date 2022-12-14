const router = require("express-promise-router")();
const categoryController = require("../controllers/category.controller");

router.get(
  "/category/:transaction_type",
  categoryController.listCategoryController
);

router.post("/category", categoryController.createCategoryController);

router.put("/category", categoryController.editCategoryController);

router.delete("/category", categoryController.deleteCategoryController);

module.exports = router;
