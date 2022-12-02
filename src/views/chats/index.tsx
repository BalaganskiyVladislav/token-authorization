import {Component, Vue} from "vue-property-decorator";
import Card from "@/components/Card";
import ChatsList from "@/components/ChatsList";
import {Store} from "@/store/store";
import {useStore} from "vuex-simple";
import Loader from "@/components/Loader";
import styles from "./index.module.css"
import {pagesRoutes} from "@/router/routes";
import {ChatsResponse} from "@/api/generated/generated-service";
import Search from "@/components/Search";

@Component
export default class Chats extends Vue {


    private readonly store: Store = useStore(this.$store)

    private readonly chatsPerPage = 20
    private offset = 0
    private isLoading = false
    private searchTitle = ''

    private get chats(): ChatsResponse[] {
        return this.store.chats.chatsList;
    }

    private async created(): Promise<void> {
        this.searchTitle = typeof this.$route.query.title === 'string' ? this.$route.query.title : '';
        await this.fetchChats();
    }

    private async fetchChats(join = true): Promise<void> {
        this.isLoading = true;

        await this.store.chats.fetchChats({
            limit: this.chatsPerPage,
            offset: this.offset,
            title: this.searchTitle,
            join: join
        });

        this.isLoading = false;
    }

    private async loadMore() {
        this.offset += this.chatsPerPage;
        await this.fetchChats()
    }

    private async searchChats(title: string): Promise<void> {
        if (this.searchTitle.toLowerCase() !== title.toLowerCase()) {
            this.offset = 0;
            this.searchTitle = title.toLowerCase();
            this.$router.push({query: {title: this.searchTitle}})

            await this.fetchChats(false)
        }
    }


    render() {
        return (
            <Card>
                <span slot="title">Чаты</span>
                <router-link
                    class={styles.createChatBtn}
                    to={pagesRoutes.createChat.path}
                >
                    Создать чат
                </router-link>

                <Search
                    whenSearch={(title) => this.searchChats(title)}
                    class={styles.chatsSearch}
                />

                {this.chats.length ?
                    <ChatsList
                        allItemsLoaded={this.store.chats.allChatsLoaded}
                        onLoad={() => this.loadMore()}
                        chats={this.chats}
                    />
                    : <span>Чатов не найдено</span>}

                <Loader isShow={this.isLoading} />
            </Card>
        )
    }
}
