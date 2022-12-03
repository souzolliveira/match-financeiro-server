const router = require("express-promise-router")();
const subcategoryController = require("../controllers/subcategory.controller");

router.post("/subcategory", subcategoryController.createSubcategory);

router.put("/subcategory", subcategoryController.editSubcategory);

router.delete("/subcategory", subcategoryController.deleteSubcategory);

module.exports = router;
