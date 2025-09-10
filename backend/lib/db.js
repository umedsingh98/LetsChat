import mongoose from "mongoose";

export const connectDB = async () => {
    try {

        mongoose.connection.on("connected", () => console.log("Database Connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}/letschat`)
    } catch (error) {
        console.log("Error occuring is: "+error);
    }
}