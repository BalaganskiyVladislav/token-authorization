import {Component, Emit, Prop} from "vue-property-decorator";
import styles from './index.module.css'
import {VueComponent} from "@/types/VueComponent";

interface Props {
    placeholder: string,
    type: 'text' | 'password' | 'email' | 'search',
    value?: string,
    vModel?: string
}

@Component
export default class BaseInput extends VueComponent<Props> {
    @Prop() private readonly placeholder!: Props["placeholder"]
    @Prop() private readonly type!: Props["type"]
    @Prop() private readonly value!: Props["value"]


    @Emit('input')
    private handleOnInput(e: Event): string {
        return (e.target as HTMLInputElement).value;
    }

    render() {
        return (
            <input
                type={this.type}
                value={this.value}
                class={styles.baseInput}
                placeholder={this.placeholder}
                onInput={(e) => this.handleOnInput(e)}
            />
        )
    }
}
