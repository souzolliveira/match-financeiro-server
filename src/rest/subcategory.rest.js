const router = require("express-promise-router")();
const subcategoryController = require("../controllers/subcategory.controller");

router.post(
  "/subcategory/:transaction_type",
  subcategoryController.listSubcategoryController
);

router.post("/subcategory", subcategoryController.createSubcategoryController);

router.put("/subcategory", subcategoryController.editSubcategoryController);

router.delete(
  "/subcategory",
  subcategoryController.deleteSubcategoryController
);

module.exports = router;
