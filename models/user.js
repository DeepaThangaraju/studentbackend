import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    role:{type:String,required:true},
    password:{type:String,required:true},
    address: {
        doorNo: { type: Number, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: String, required: true }
    }
}, { timestamps: true });

export const userModel = mongoose.model("user", userSchema);

