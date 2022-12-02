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
export default class SignIn extends Vue {

    private readonly store: Store = useStore(this.$store)

    private login = ''
    private password = ''

    private isLoading = false
    private isSend = false

    private get isAuthorized(): boolean {
        return this.store.user.isAuthorized;
    }

    private async signIn(): Promise<void> {
        this.isLoading = true;
        this.isSend = false;

        await this.store.user.singIn({
            login: this.login,
            password: this.password,
        })

        this.isSend = true;
        this.isLoading = false;
    }

    render() {
        const errorMessage = this.isSend && !this.isAuthorized ?
            <span class={styles.formErrorMessage}>
                Произошла ошибка! Повторите попытку
            </span>
            : '';

        return (
            <Card>
                <span slot="title">Авторизация</span>
                <UserForm isLoading={this.isLoading}>
                    <div class={styles.formItem}>
                        <BaseInput
                            type="text"
                            placeholder="Логин"
                            vModel={this.login}
                        />
                    </div>
                    <div class={styles.formItem}>
                        <BaseInput
                            type="password"
                            placeholder="Пароль"
                            vModel={this.password}
                        />
                    </div>

                    {errorMessage}

                    <BaseBtn
                        onClick={this.signIn}
                    >
                        Войти
                    </BaseBtn>
                    <router-link to={pagesRoutes.signUp.path} class={styles.formLink}>Зарегистрироваться</router-link>
                </UserForm>
            </Card>
        )
    }
}
