import {Component, Emit, Vue} from "vue-property-decorator";
import styles from './index.module.css'

@Component
export default class BaseBtn extends Vue {

    @Emit('click')
    private createClickEvent(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        return (
            <button
                class={styles.baseBtn}
                onClick={this.createClickEvent}
            >
                {this.$slots.default}
            </button>
        )
    }
}
