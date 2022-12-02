import {UserResponse} from "@/api/generated/generated-service";


export interface Chat {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
        user: UserResponse
        time: Date
        content: string
    }
}

export interface ChatsParams {
    offset: number
    limit: number
    title: string
    join: boolean
}
