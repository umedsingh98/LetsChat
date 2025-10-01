import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from '../lib/cloudinary.js'
import { io, userSocketMap } from "../index.js";


//Get All Users except logged in users
export const getUsersForSidebar = async (req,res) => {
   try {
    const userId =  req.user._id;
    const filteredUSers = await User.find({_id: {$ne: userId}}).select("-password");

    //count no. of messages not seen yet
    const unseenMessages = {};
    const promises = filteredUSers.map(async (user) => {
        const messages = await Message.find({ senderId: user._id, recieverId: userId, seen: false });
        if (messages.length > 0) {
            unseenMessages[user._id] = messages.length; // fix: correct object key assignment
        }
    })
 await Promise.all(promises);
 res.json({success: true, users: filteredUSers, unseenMessages});

   } catch (error) {
    console.log(error.message);
    res.json({success: false, message: error.message});
   }
}



//Get all messages for selected users
export const getMessages = async (req, res) => {
    try {
        
        const {id: selectedUserId} = req.params;
        const myId = req.user._id;
        
        const messages = await Message.find({
            $or: [
            {senderId: myId, recieverId: selectedUserId},
            {senderId: selectedUserId, recieverId: myId}
        ]
    });

    await Message.updateMany({senderId: selectedUserId, recieverId: myId},{seen: true});

    res.json({success: true, messages});

    } catch (error) {
      console.log(error.message);
      res.json({success: false, message: error.message});
    }
}



//Api to mark message as seen using message id 
export const markMessageAsSeen = async (req, res) => {
   try {
    const {id} = req.params;
    await Message.findByIdAndUpdate(id, {seen: true});
   res.json({success: true})

   } catch (error) {
     console.log(error.message);
      res.json({success: false, message: error.message});
   }
}


//Send message to selected user
export const sendMessage = async (req, res) => {
 try {
    const {text, image} = req.body;
    const recieverId = req.params.id;
    const senderId = req.user._id;
    
    let imageUrl;
    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
        senderId,
        recieverId,
        text,
        image: imageUrl
    })

    //Emit the new message to the reciever's socket
    const recieverSocketId = userSocketMap[recieverId];
    if(recieverSocketId){
        io.to(recieverSocketId).emit("newMessage", newMessage)
    }

    res.json({success: true, newMessage });
    
 } catch (error) {
     console.log(error.message);
      res.json({success: false, message: error.message});
 }
}