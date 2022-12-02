import {Component, Vue} from "vue-property-decorator";
import styles from './index.module.css'
import UserInfo from "@/components/UserInfo"
import {Store} from "@/store/store";
import {useStore} from "vuex-simple";
import {UserData} from "@/types/User";

@Component
export default class Header extends Vue {

    private readonly store: Store = useStore(this.$store);

    private async logout(): Promise<void> {
        await this.store.user.logout();
    }

    private get user(): UserData | undefined {
         return this.store.user.user;
    }

    private async created(): Promise<void> {
        await this.store.user.getUser()
    }

    render() {
        if (!this.user)
            return

        return (
            <header class={styles.header}>
                <UserInfo user={this.user} />
                <button
                    onClick={() => this.logout()}
                    class={styles.headerBtn}
                >
                    Выйти
                </button>
            </header>
        )
    }
}
