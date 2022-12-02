import {Component, Prop} from "vue-property-decorator";
import styles from './index.module.css'
import {VueComponent} from "@/types/VueComponent";


interface Props {
    currentPage: number,
}

@Component
export default class Pagination extends VueComponent<Props> {

    @Prop() private readonly currentPage!: Props["currentPage"]


    private changePage(prev = false): void {
        const page = prev ? this.currentPage - 1 : this.currentPage + 1;

        this.$router.push({query: {
                page: page.toString()
        }});
    }


    render() {
        return (
            <div class={styles.pagination}>
                <button
                    disabled={this.currentPage === 1}
                    class={styles.paginationBtn}
                    onClick={() => this.changePage(true)}
                >
                    Пред. страница
                </button>
                <div class={styles.paginationItem}>
                    {this.currentPage}
                </div>
                <button
                    class={styles.paginationBtn}
                    onClick={() => this.changePage()}
                >
                    След. страница
                </button>
            </div>
        )
    }
}
