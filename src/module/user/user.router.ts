import express from 'express'
import { userControllers } from './user.controller';

const router = express.Router()

router.post('/', userControllers.createUser)
router.get('/', userControllers.getAllUser)
router.get('/:userId', userControllers.getAUser)
router.put('/:userId', userControllers.UpdateAUserCon)
router.delete('/:userId', userControllers.deleteAUser)
router.put('/:userId/orders', userControllers.addProduct)
router.get('/:userId/orders', userControllers.getAllProduct)
router.get('/:userId/orders/total-price', userControllers.getAllProductPrice)


export const userRouter = router;