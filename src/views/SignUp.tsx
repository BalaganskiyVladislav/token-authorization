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
export default class SignUp extends Vue {

    private readonly store: Store = useStore(this.$store)

    private name = ''
    private secondName = ''
    private login = ''
    private email = ''
    private password = ''
    private phone = ''

    private isLoading = false
    private isSend = false

    private get isAuthorized(): boolean {
        return this.store.user.isAuthorized;
    }

    private async signUp(): Promise<void> {
        this.isLoading = true;
        this.isSend = false;

        await this.store.user.signUp({
            login: this.login,
            password: this.password,
            first_name: this.name,
            second_name: this.secondName,
            phone: this.phone,
            email: this.email
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
                <span slot="title">Регистрация</span>
                <UserForm isLoading={this.isLoading}>
                    <div class={styles.formItem}>
                        <BaseInput
                            type="text"
                            placeholder="Имя"
                            vModel={this.name}
                        />
                    </div>
                    <div class={styles.formItem}>
                        <BaseInput
                            type="text"
                            placeholder="Фамилия"
                            vModel={this.secondName}
                        />
                    </div>
                    <div class={styles.formItem}>
                        <BaseInput
                            type="text"
                            placeholder="Логин"
                            vModel={this.login}
                        />
                    </div>
                    <div class={styles.formItem}>
                        <BaseInput
                            type="email"
                            placeholder="Почта"
                            vModel={this.email}
                        />
                    </div>
                    <div class={styles.formItem}>
                        <BaseInput
                            type="password"
                            placeholder="Пароль"
                            vModel={this.password}
                        />
                    </div>
                    <div class={styles.formItem}>
                        <BaseInput
                            type="text"
                            placeholder="Телефон"
                            vModel={this.phone}
                        />
                    </div>

                    {errorMessage}

                    <BaseBtn onClick={this.signUp}>
                        Зарегистрироваться
                    </BaseBtn>
                    <router-link
                        to={pagesRoutes.signIn.path}
                        class={styles.formLink}
                    >
                        Войти по логину
                    </router-link>
                </UserForm>
            </Card>
        )
    }
}
