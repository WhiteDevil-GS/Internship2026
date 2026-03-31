const express = require("express");
const router = express.Router();
const controller = require("../controllers/folderController");

router.post("/", controller.createFolder);
router.get("/", controller.getFolders);
router.delete("/:id", controller.deleteFolder);

module.exports = router;