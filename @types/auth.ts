export interface IUser {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    created_at: string
    updated_at: string
}

export interface IRole {
    id: number
    name: string
    key: string
    created_at: string
    updated_at: string
}

export interface IPermission {
    id: number
    user_id: number
    role_id: number
    role: IRole
}