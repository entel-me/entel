import * as z from "zod"

export const List = z.object({
    id: z.number().int()
})

export const NewList = z.object({
    store: z.string(),
    specialWish: z.string()
})

export const NewItem = z.object({
    listId: z.number().int(),
    itemName: z.string()
})

export const StoreCommentUpdate = z.object({
    id: z.number().int(),
    store: z.string(),
    comment: z.string()
})