import { IUser } from "./auth"

export interface IForum {
    id: number
    content: string
    user_id: number
    user: IUser
    created_at: string
    updated_at: string
}