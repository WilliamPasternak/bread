const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes 
router.get("/:id", ensureAuth, postsController.getPost);
router.post("/createPost", postsController.createPost);
router.post("/addShift", postsController.addShift);

//Verify Posts
router.post("/verify", upload.single("file"), postsController.verifyPost);

// Delete Post from Recent Salaries Table
router.delete("/deletePost/:id", postsController.deletePost);

// Delete Shift from Profile
router.delete("/deleteShift/:id", postsController.deleteShift);

router.put("/flagPost/:id", postsController.flagPost);
// Edit Posts
router.get("/editPost/:id", ensureAuth, postsController.editPost);
router.put("/editPost/:id", postsController.updatePost);

module.exports = router;
