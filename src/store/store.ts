import {Module} from "vuex-simple";
import {User} from "./modules/user";
import {Chats} from "./modules/chats";

export class Store {
    @Module()
    public user = new User();

    @Module()
    public chats = new Chats();
}

