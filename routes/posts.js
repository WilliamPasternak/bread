const express = require("express");
const router = express.Router();
//const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//Post Routes 
router.get("/:id", ensureAuth, postsController.getPost);
router.post("/createPost", postsController.createPost);
router.delete("/deletePost/:id", postsController.deletePost);
router.put("/likePost/:id", postsController.likePost);

// Edit Posts
router.get("/editPost/:id", ensureAuth, postsController.editPost);
//router.put("/editPost/:id", postsController.updatePost);

// Old post route which uploaded a file.
//router.post("/createPost", //upload.single("file"), postsController.createPost);


module.exports = router;
