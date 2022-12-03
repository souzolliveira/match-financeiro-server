const router = require("express-promise-router")();
const categoryController = require("../controllers/category.controller");

router.post("/category", categoryController.createCategory);

router.put("/category", categoryController.editCategory);

router.delete("/category", categoryController.deleteCategory);

module.exports = router;
