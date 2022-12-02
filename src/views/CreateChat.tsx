import {Component, Vue} from "vue-property-decorator";
import Card from "@/components/Card";
import UserForm from "@/components/UserForm";
import styles from "@/components/UserForm/index.module.css";
import BaseInput from "@/components/BaseInput";
import BaseBtn from "@/components/BaseBtn";
import {Store} from "@/store/store";
import {useStore} from "vuex-simple";
import {pagesRoutes} from "@/router/routes";

@Component
export default class CreateChat extends Vue {

    private readonly store: Store = useStore(this.$store);

    private name = ''
    private isLoading = false;

    private async createChat(): Promise<void> {
        this.isLoading = true;
        await this.store.chats.createChat(this.name);
        this.isLoading = false;
    }

    render() {
        return (
            <Card>
                <span slot="title">Создать чат</span>
                <UserForm isLoading={this.isLoading}>
                    <div class={styles.formItem}>
                        <BaseInput
                            type="text"
                            placeholder="Название"
                            vModel={this.name}
                        />
                    </div>

                    <BaseBtn
                        onClick={this.createChat}
                    >
                        Создать
                    </BaseBtn>
                    <router-link to={pagesRoutes.chats.path} class={styles.formLink}>Список чатов</router-link>
                </UserForm>
            </Card>
        )
    }
}
