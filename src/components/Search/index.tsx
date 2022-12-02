import {Component, Prop} from "vue-property-decorator";
import styles from './index.module.css';
import BaseInput from "@/components/BaseInput"
import BaseBtn from "@/components/BaseBtn";
import {VueComponent} from "@/types/VueComponent";

interface Props {
    whenSearch: (title: string) => void
}

@Component
export default class Search extends VueComponent<Props> {

    @Prop() private readonly whenSearch!: Props["whenSearch"]

    private query = '';

    private handleFormSubmit(e: KeyboardEvent): void {
        if (e.key === 'Enter') this.whenSearch(this.query);
    }

    render() {
        return (
            <form
                onKeyup={this.handleFormSubmit}
                class={styles.searchBox}
            >
                <BaseInput
                    class={styles.searchInput}
                    type="search"
                    placeholder="Поиск"
                    vModel={this.query}
                />
                <BaseBtn
                    type="submit"
                    onClick={() => this.whenSearch(this.query)}
                    class={styles.searchBtn}>
                    Искать
                </BaseBtn>
            </form>
        )
    }
}
