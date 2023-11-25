import { model, Schema } from "mongoose";
import { Taddress, Tname, Tproduct, Tuser, UserModel } from "./user.interface";

const Tproduct = new Schema<Tproduct>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
})

const TnameSchema = new Schema<Tname>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
})

const TaddressSchema = new Schema<Taddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
})

const userSchema = new Schema<Tuser, UserModel>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullName: {
        type: TnameSchema,
        required: true
    },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
    address: {
        type: TaddressSchema,
        required: true
    },
    orders: {
        type: [Tproduct]
    }
});

userSchema.statics.isUserExists = async function (userId: number) {
    const existingUser = await User.findOne({ userId: userId })
    return existingUser;
}

userSchema.post('save', async function (doc, next) {
    doc.password = ''
    next()
})
export const User = model<Tuser, UserModel>('User', userSchema)
