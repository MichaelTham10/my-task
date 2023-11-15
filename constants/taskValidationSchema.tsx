import { z } from "zod";

export const taskSchema = z.object({
    title: z.string({
        required_error: 'Title cannot be empty'
    }).min(5, 'Title minimum has 5 five characters'),
    description: z.string({
        required_error: 'Description cannot be empty'
    }).min(5, 'Description minimum has 5 five characters'),
    datetime: z.date({
        required_error: 'This field must not be empty'
    })
})