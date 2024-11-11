import { z } from "zod";

export const editNoteSchema = z.object({

    title: z.string('title is a string'),
    content: z.string('content is a string'),
    isPinned: z.boolean()
})

export const validateEditNotes = (data) => {

    try {
        editNoteSchema.parse(data)
        return {
            success: true
        }
    } catch (err) {

        return {
            success: false,
            message: err.errors.map((e) => e.message).join(", ")
        }
    }

}