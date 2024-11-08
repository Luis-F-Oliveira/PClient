import { IUser } from "./auth"

export interface IExercise {
    id: number
    name: string
    option: string
    user_id: number
    user: IUser
    created_at: string
    updated_at: string
}

export interface IDiet extends IExercise {}