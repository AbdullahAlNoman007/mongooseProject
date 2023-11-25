import { array } from "zod";
import { Tuser } from "./user.interface";
import { User } from "./user.model";

interface product {
    productName: string,
    price: number,
    quantity: number
}


const createUserIntoDB = async (userData: Tuser) => {


    if (await User.isUserExists(userData.userId)) {
        throw new Error('User alreay exists!')
    }
    const result = await User.create(userData)

    return result
}
const getUserFromDB = async () => {
    const result = await User.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 })
    return result
}
const getAUserFromDB = async (id: number) => {
    const result = await User.findOne({ userId: id }, { username: 1, fullName: 1, age: 1, email: 1, address: 1, userId: 1, isActive: 1, hobbies: 1, _id: 0, orders: 1 })
    return result
}
const UpdateAUserFromDB = async (id: number, userData: Tuser) => {

    if (!await User.isUserExists(userData.userId)) {
        throw new Error('')
    }
    const result = await User.updateOne({ userId: id }, { $set: userData })
    return result

}
const deleteAUserFromDB = async (id: number) => {
    const result = await User.deleteOne({ userId: id })
    return result
}
const addProductIntoDB = async (id: number, product: product) => {
    if (!(await User.isUserExists(id))) {
        throw new Error('User does not exist');
    }
    const { productName, price, quantity } = product;
    const result = await User.updateOne(
        { userId: Number(id) },
        { $push: { orders: product } },
        { new: true, upsert: true }
    );
    console.log(result);

    return result

};

const getAllProductFromDB = async (id: number) => {
    if (!await User.isUserExists(id)) {
        throw new Error('')
    }
    const result = await User.findOne({ userId: id }, { "orders.productName": 1, _id: 0, "orders.price": 1, "orders.quantity": 1 })
    return result
}
const getAllProductPriceFromDB = async (id: number) => {
    if (!await User.isUserExists(id)) {
        throw new Error('')
    }
    const result = await User.findOne({ userId: id }, { _id: 0, "orders.price": 1, "orders.quantity": 1 })


    return result

}

export const userService = {
    createUserIntoDB,
    getUserFromDB,
    getAUserFromDB,
    UpdateAUserFromDB,
    deleteAUserFromDB,
    addProductIntoDB,
    getAllProductFromDB,
    getAllProductPriceFromDB
}