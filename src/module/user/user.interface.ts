import { Model } from "mongoose";


export interface Torder {
    orders: {
        price: number;
        quantity: number;
    }
}

export interface Tproduct {
    productName: string,
    price: number,
    quantity: number
}

export interface Tname {
    firstName: string;
    lastName: string;
}
export interface Taddress {
    street: string;
    city: string;
    country: string;
}
export interface Tuser {
    userId: number;
    username: string;
    password: string;
    fullName: Tname;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: Taddress;
    orders?: Tproduct[] | undefined;
}

export interface UserModel extends Model<Tuser> {
    // eslint-disable-next-line no-unused-vars
    isUserExists(userId: number): Promise<Tuser | null>
}