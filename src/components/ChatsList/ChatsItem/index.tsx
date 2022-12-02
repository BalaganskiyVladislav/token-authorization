import {Component, Prop} from "vue-property-decorator";
import styles from './index.module.css'
import {VueComponent} from "@/types/VueComponent";
import {Chat} from "@/types/Chats";
import {ChatsResponse} from "@/api/generated/generated-service";

interface Props {
    chat: ChatsResponse
}

@Component
export default class ChatsItem extends VueComponent<Props> {

    @Prop() private readonly chat!: Props["chat"]

    render() {
        return (
            <div class={styles.chatsItem}>
                <a href={`chats/${this.chat.id}`}>
                    {this.chat.title}
                </a>
            </div>
        )
    }
}
