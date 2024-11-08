export interface IUser {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    created_at: string
    updated_at: string
}

export interface IPersonal {
    id: number
    age: number
    weight: number
    heigth: number
    health_goals: string
    user_id: number
    created_at: string
    updated_at: string
}