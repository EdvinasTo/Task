import z from "zod";

const personSchema = z.object({
    name: z.string()
        .min(1, 'Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .regex(/^[a-zA-Z\s-]+$/, 'Name can only contain letters, spaces and hyphens'),

    address: z.string()
        .min(1, 'Address is required')
        .min(10, 'Address must be at least 10 characters')
        .max(200, 'Address must be less than 200 characters'),

    phone: z.string()
        .min(1, 'Phone number is required')
        .regex(/^[\+]?[0-9][\d]{0,15}$/, 'Please enter a valid phone number')
        .min(10, 'Phone number must be at least 10 digits')
        .max(16, 'Phone number must be less than 16 digits')
});

const formSchema = z.object({
    sender: personSchema,
    recipient: personSchema,
});

export default formSchema;