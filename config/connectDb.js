import mongoose from "mongoose";

const connectDb = async(url) => {
    try {
        await mongoose.connect(url);
        console.log("DB connected")
    } catch (err) {
        console.log(`Error while connecting DB ${err}`)
    }
}

export default connectDb;