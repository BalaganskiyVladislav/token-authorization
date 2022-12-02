import { Api } from "./generated/generated-service";


const authService = new Api({}).auth;
const userService = new Api().user;
const chatsService = new Api().chats;

export default {
    auth: authService,
    user: userService,
    chats: chatsService
}
