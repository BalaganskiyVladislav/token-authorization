import {Component, Prop} from "vue-property-decorator";
import styles from './index.module.css'
import Loader from "@/components/Loader";
import {VueComponent} from "@/types/VueComponent";

interface Props {
    isLoading: boolean
}

@Component
export default class UserForm extends VueComponent<Props> {

    @Prop() private readonly isLoading!: Props["isLoading"]


    render() {
        return (
            <form class={styles.form}>
                {this.$slots.default}
                <Loader isShow={this.isLoading} />
            </form>
        )
    }
}
