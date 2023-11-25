import { z } from 'zod';

const TnameValidationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
});
const TaddressValidationSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
});
const TproductValidationSchema = z.object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number()
})
const TuserValidationSchema = z.object({
    userId: z.number(),
    username: z.string(),
    password: z.string(),
    fullName: TnameValidationSchema,
    age: z.number(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: TaddressValidationSchema,
    orders: z.array(TproductValidationSchema).optional()
});
export default TuserValidationSchema