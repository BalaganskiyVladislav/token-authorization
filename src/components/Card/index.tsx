import {Component, Vue} from "vue-property-decorator";
import styles from './index.module.css'

@Component
export default class Card extends Vue {
    render() {
        return (
            <div class={styles.card}>
                <h2 class={styles.cardTitle}>{this.$slots.title}</h2>
                {this.$slots.default}
            </div>
        )
    }
}
