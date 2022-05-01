const User = require("../models/userModel");
const Messages = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { to, message } = req.body;
    const from = await User.findById(req.user._id);
    const data = await Messages.create({
      message: { text: message },
      users: [from._id, to],
      sender: from._id,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.deleteMessage = async (req, res, next) => {
  try {
    const sender = await User.findById(req.user._id);
    if (!sender) return res.json("Sender invalid");

    const message = await Messages.findById(req.params.id);
    if (!message)
      return res.json({ msg: "Message id is required or doest exist!" });

    await Messages.findByIdAndDelete(req.params.id);
    return res.status(200).send("Message deleted!");
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllMessagesFromSender = async (req, res, next) => {
  try {
    const senderId = await User.findById(req.user._id);
    const messages = await Messages.find({
      sender: senderId._id,
    });
    res.json(messages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUnreadMessages = async (req, res, next) => {
  try {
    const senderId = await User.findById(req.user._id);
    const messages = await Messages.find({
      isRead: false,
      sender: senderId._id,
    });
    if (messages == "")
      return res.json("All The messages readed for this user");

    await Messages.updateMany({ isRead: false }, { $set: { isRead: true } });

    res.json(messages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getUnreadMessage = async (req, res, next) => {
  try {
    const { to } = req.body;
    const from = await User.findById(req.user._id);
    const message = await Messages.findOneAndUpdate(
      {
        users: [from, to],
        isRead: false,
      },
      { $set: { isRead: true } }
    );

    res.json(message);
  } catch (ex) {
    next(ex);
  }
};
