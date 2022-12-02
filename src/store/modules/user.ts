import {Action, Getter, Mutation, State} from 'vuex-simple';
import services from '@/api'
import router from "@/router";
import {pagesRoutes} from "@/router/routes";
import {SignInRequest, SignUpRequest, UserResponse} from "@/api/generated/generated-service";
import {AxiosResponse} from "axios";



export class User {
    @State()
    public user: UserResponse | undefined;


    @Getter()
    public get userId(): number | undefined  {
        return this.user?.id;
    }

    @Getter()
    public get isAuthorized(): boolean {
        return !!this.user?.id;
    }

    @Mutation()
    private setUserData(data: UserResponse | undefined): void {
        this.user = data;
    }

    @Action()
    public async getUser(): Promise<void> {
        try {
            const res: AxiosResponse<UserResponse> = await services.auth.userList();
            this.setUserData(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    @Action()
    public async singIn(data: SignInRequest): Promise<void> {
        try {
            await services.auth.signinCreate({
                login: data.login,
                password: data.password,
            });

            localStorage.setItem('isAuthorized', 'OK');
            await this.getUser();

            router.push(pagesRoutes.chats.path)
        } catch (err) {
            console.error(err);
        }
    }

    @Action()
    public async signUp(data: SignUpRequest): Promise<void> {
        try {
            await services.auth.signupCreate(data);

            localStorage.setItem('isAuthorized', 'OK');
            await this.getUser()

            router.push(pagesRoutes.chats.path)
        } catch (err) {
            console.error(err);
        }
    }

    @Action()
    public async logout(): Promise<void> {
        try {
            await services.auth.logoutCreate();

            localStorage.removeItem('isAuthorized');
            this.setUserData(undefined)

            router.push(pagesRoutes.signIn.path)
        } catch (err) {
            console.error(err);
        }
    }
}
