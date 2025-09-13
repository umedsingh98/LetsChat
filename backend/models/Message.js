import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recieverId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: {type: String},
  image: {type: String},
  seen: {type: Boolean, default: false}
},{timestamps: true}
);

const Message = new mongoose.model("Message", messageSchema);

export default Message;