const {
  addMessage,
  getMessages,
  deleteMessage,
  getAllMessagesFromSender,
  getAllUnreadMessages,
  getUnreadMessage,
} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.delete("/deletemsg/:id", deleteMessage);
router.get("/getallmsg/", getAllMessagesFromSender);
router.put("/getallunreadmsg/", getAllUnreadMessages);
router.get("/getunreadmsg/", getUnreadMessage);

module.exports = router;
