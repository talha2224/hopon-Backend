const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    ctemsId:{type:mongoose.Schema.Types.ObjectId,ref:"CtemsAccount"},
    physicianId:{type:mongoose.Schema.Types.ObjectId,ref:"PhysicianAccount"},
    senderRole: { type: String, required: true}, // Role of the sender
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema, "Message");

module.exports = Message;
