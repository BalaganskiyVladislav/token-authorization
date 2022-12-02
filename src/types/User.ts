export interface UserSignInData {
    login: string,
    password: string,
}

export interface UserSignUpData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export interface UserData {
    avatar: string | null
    display_name: string | null
    first_name: string
    second_name: string
    email: string
    id: number
    login: string
}
