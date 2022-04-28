const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map(msg => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Messages.findById(req.params.id);
    if (!message)
      return res.json({ msg: "Message id is required or doest exist!" });

    const { sender } = req.body;
    if (sender != message.sender)
      return res.json({
        msg: "Just owner of the message can delete the message",
      });
    await Messages.findByIdAndDelete(req.params.id);
    return res.status(200).send("Message deleted!");
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllMessagesFromSender = async (req, res, next) => {
  try {
    const { senderId } = req.body;
    const messages = await Messages.find({
      sender: [senderId],
    });
    res.json(messages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUnreadMessages = async (req, res, next) => {
  try {
    const { senderId } = req.body;
    const messages = await Messages.find({
      isRead: false,
      sender: [senderId],
    });
    console.log(messages);
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
    const { from, to } = req.body;

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
