import {Action, Getter, Mutation, State} from 'vuex-simple';
import { ChatsParams} from "@/types/Chats";
import router from "@/router";
import {pagesRoutes} from "@/router/routes";
import services from "@/api"
import {AxiosResponse} from "axios";
import {ChatsResponse} from "@/api/generated/generated-service";


export class Chats {
    @State()
    public chats: ChatsResponse[] = []
    public allChatsLoaded = false

    @Getter()
    public get chatsList(): ChatsResponse[] {
        return this.chats;
    }


    @Mutation()
    private setChats(data: ChatsResponse[]): void {
        this.chats = data;
    }

    @Mutation()
    private setLoaded(value: boolean): void {
        this.allChatsLoaded = value;
    }

    @Action()
    public async fetchChats(data: ChatsParams, join = true): Promise<void> {
        try {
            const res: AxiosResponse<ChatsResponse[]> =
                await services.chats.chatsList({offset: data.offset, limit: data.limit, title: data.title});

            const chatsData: ChatsResponse[] = data.join ? [...this.chats, ...res.data] : res.data

            if (join && this.chatsList.length === chatsData.length || chatsData.length < data.limit) {
                this.setLoaded(true);
            } else {
                this.setLoaded(false);
            }

            this.setChats(chatsData);
        } catch (err) {
            console.error(err);
        }
    }

    @Action()
    public async createChat(title: string): Promise<void> {
        try {
            await services.chats.chatsCreate({title: title})

            router.push(pagesRoutes.chats.path)
        } catch (err) {
            console.error(err);
        }
    }
}
