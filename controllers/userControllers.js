import { userModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        if (!users) {
            return res.status(400).json({ message: "No user Found" })
        }
        return res.status(200).json({ message: "Users are here", data: users })
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

export const enterUser = async (req, res) => {
    try {
        const { name, email, phoneNumber,password,role, address } = req.body;
        if (!name || !email || !phoneNumber || !role ||!password || !address) {
            return res.status(404).json({ message: "Enter all values" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
       
        const newUser = {
            name,
            email,
            phoneNumber,
            role,
            password:hashedPassword,
            address
        }
        const user = await userModel(newUser)
        await user.save();
        return res.status(201).json({ message: "User added successfully", data: user })
    } catch (err) {
        return res.status(500).json({ message: `Something went wrong ${err}` })
    }
}

export const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) {
            return res.status(404).json({ message: "Id not found" })
        }
        const user = await userModel.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ data: user })
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" })
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({message:"User not found or invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = JWT.sign({ userId: user._id,role:user.role }, process.env.JWT_SEcurity_key, { expiresIn: "1h" });
            return res.status(200).json({token:token})
        }
    } catch (err) {
        return res.status(500).json({message:`Some thing wrong ${err}`})
    }
}

export const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({ message: "Id not found" })
        }

        const { name, email, phoneNumber, address } = req.body;

        console.log(address);
        const userInfo = await userModel.findById({ _id: id });

        let realAdd = userInfo.address;

        console.log({ ...realAdd, ...address });



        let user = {
            name: name || userInfo.name,
            email: email || userInfo.email,
            phoneNumber: phoneNumber || userInfo.phoneNumber,
            address: { ...realAdd, ...address }
        }

        const userUpdated = await userModel.updateOne({ _id:id }, user, { new: true });
        if (!userUpdated) {
            return res.status(400).json({ message: `User is not updated` })
        }
        return res.status(200).json({ message: "Updated successfully", data: userUpdated })
    } catch (err) {
        return res.status(500).json({ message: `Something went wrong ${err}` })
    }
}


export const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({ message: "User id not found" })
        }
        const deletedUser = await userModel.deleteOne({ _id: id }, { new: true });
        if (deletedUser.deletedCount===0) {
            return res.status(400).json({message:"User not found"})
        }
        return res.status(200).json({message:"Deeleted successfully",data:deletedUser})
    } catch (err) {
        return res.status(500).json({message:`something went wrong ${err}`})
    }
}
