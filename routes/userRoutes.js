const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.route("/").get(userController.getAllUsers);

router
  .route("/user-id/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser);



router.use(authController.protect);



router.route("/me").get(userController.getMe, userController.getUser);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

module.exports = router;
