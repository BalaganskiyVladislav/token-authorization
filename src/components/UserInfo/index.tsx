import {Component, Prop} from "vue-property-decorator";
import styles from './index.module.css'
import {UserData} from "@/types/User";
import {VueComponent} from "@/types/VueComponent";

interface Props {
    user: UserData
}

@Component
export default class Name extends VueComponent<Props> {
    @Prop() private readonly user!: Props["user"]

    private get fullName(): string {
        return this.user.first_name + ' ' + this.user.second_name;
    }

    render() {
        return (
            <div class={styles.userInfo}>
                <div class={styles.userPhoto}>
                    {this.user.avatar && <img src={this.user.avatar} alt={this.fullName} />}
                </div>
                <span class={styles.userName}>
                    {this.fullName}
                </span>
            </div>
        )
    }
}
