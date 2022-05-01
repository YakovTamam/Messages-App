const {
  addMessage,
  deleteMessage,
  getAllMessagesFromSender,
  getAllUnreadMessages,
  getUnreadMessage,
} = require("../controllers/messageController");
const router = require("express").Router();
const auth = require("../middlewares/auth");

router.post("/addmsg/", auth, addMessage);
router.delete("/deletemsg/:id", auth, deleteMessage);
router.get("/getallmsg/", auth, getAllMessagesFromSender);
router.put("/getallunreadmsg/", auth, getAllUnreadMessages);
router.get("/getunreadmsg/", auth, getUnreadMessage);

module.exports = router;
