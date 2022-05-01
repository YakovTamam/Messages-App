const {
  login,
  register,
  me,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/register", register);
router.post("/me", auth, me);
router.get("/allusers/:id", auth, getAllUsers);
router.post("/setavatar/:id", auth, setAvatar);
router.get("/logout/:id", auth, logOut);

module.exports = router;
