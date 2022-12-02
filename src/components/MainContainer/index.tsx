import {Component, Vue} from "vue-property-decorator";
import styles from './index.module.css'

@Component
export default class MainContainer extends Vue {
    render() {
        return (
            <main class={styles.main}>
                {this.$slots.default}
            </main>
        )
    }
}
