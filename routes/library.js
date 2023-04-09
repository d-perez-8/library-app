const express = require("express");
const router = express.Router();
const libraryController = require("../controllers/library");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, libraryController.getLibrary);
router.post("/createBook", libraryController.createBook);
router.put("/markComplete", libraryController.markComplete);
router.put("/markIncomplete", libraryController.markIncomplete);
router.delete("/deleteBook", libraryController.deleteBook);

module.exports = router;
