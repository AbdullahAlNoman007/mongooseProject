import { Request, Response } from "express";
import { userService } from "./user.service";
import TuserValidationSchema from "./user.validation";





const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;
        const zodparseData = TuserValidationSchema.parse(userData);

        const result = await userService.createUserIntoDB(zodparseData)

        if (result) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
            const { password, ...rest } = userData;
            res.status(200).json({
                success: true,
                message: "User created successfully!",
                data: rest
            })
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUserFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: error.message,
        })
    }
}
const getAUser = async (req: Request, res: Response) => {
    const { userId } = req.params

    try {
        const result = await userService.getAUserFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: error.message,
        })
    }
}
const UpdateAUserCon = async (req: Request, res: Response) => {
    const { userId } = req.params
    const { user } = req.body

    try {
        const result = await userService.UpdateAUserFromDB(Number(userId), user);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { password, ...rest } = user
        if (result.acknowledged) {
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: rest
            })
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }
}
const deleteAUser = async (req: Request, res: Response) => {
    const { userId } = req.params

    try {
        const result = await userService.deleteAUserFromDB(Number(userId))
        if (result.acknowledged) {
            res.status(500).json({
                "success": true,
                "message": "User deleted successfully!",
                "data": null
            })
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }
}

const addProduct = async (req: Request, res: Response) => {
    const { userId } = req.params
    const product = req.body


    try {


        const result = await userService.addProductIntoDB(Number(userId), product)
        if (!(result.acknowledged)) {
            throw new Error('')
        }


        res.status(500).json({
            "success": true,
            "message": "Order created successfully!",
            "data": null
        })


        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }
}

const getAllProduct = async (req: Request, res: Response) => {
    const { userId } = req.params

    try {

        const result = await userService.getAllProductFromDB(Number(userId))

        res.status(500).json({
            success: true,
            message: "Order fetched successfully!",
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }

}
const getAllProductPrice = async (req: Request, res: Response) => {
    const { userId } = req.params
    try {
        let price: number = 0
        const result = await userService.getAllProductPriceFromDB(Number(userId))
        const { orders } = result
        for (const order of orders) {
            price = price + (order.price * order.quantity)
        }

        res.status(500).json({
            success: true,
            message: "Total price calculated successfully!",
            data: {
                totalPrice: price
            }
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }

}



export const userControllers = {
    createUser,
    getAllUser,
    getAUser,
    UpdateAUserCon,
    deleteAUser,
    addProduct,
    getAllProduct,
    getAllProductPrice
}

