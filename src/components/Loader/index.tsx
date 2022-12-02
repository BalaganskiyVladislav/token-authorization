import {Component, Prop} from "vue-property-decorator";
import styles from './index.module.css'
import {VueComponent} from "@/types/VueComponent";

interface Props {
    isShow: boolean
}

@Component
export default class Loader extends VueComponent<Props> {

    @Prop() private readonly isShow!: Props["isShow"]

    render() {
        if (this.isShow) {
            return (
                <div class={styles.loaderWrap}>
                    <div class={styles.loader} />
                </div>
            )
        }
    }
}
