import {Component, Prop} from "vue-property-decorator";
import styles from './index.module.css'
import ChatsItem from "@/components/ChatsList/ChatsItem";
import {VueComponent} from "@/types/VueComponent";
import {ChatsResponse} from "@/api/generated/generated-service";
import {StyleValue} from "vue/types/jsx";

interface Props {
    chats: ChatsResponse[],
    allItemsLoaded: boolean
    onLoad?: () => void
}

const rowHeight = 35;
const visibleRows = 10;

@Component
export default class ChatsList extends VueComponent<Props> {

    @Prop() private readonly chats!: Props["chats"]
    @Prop() private readonly allItemsLoaded!: Props["allItemsLoaded"]

    private start = 0;
    private maxRows = 0;


    private get rowStyle(): StyleValue {
        return `height: ${rowHeight}px`
    }

    private get scrollableWrapperStyle(): StyleValue {
        return `height: ${rowHeight * visibleRows}px; overflow: auto;`
    }

    private get topFakeElementStyle(): StyleValue {
        return `height: ${rowHeight * this.start}px`;
    }

    private get bottomFakeElementStyle(): StyleValue {
        const height = rowHeight * (this.chats.length - (this.start + visibleRows));
        return `height: ${height < 0 ? 0 : height}px`;
    }


    private onScroll(e: Event): void {
        this.start = Math.floor((e.target as HTMLElement).scrollTop / rowHeight);

        if (
            (this.start + visibleRows > this.chats.length - Math.floor(visibleRows / 2))
            &&
            this.maxRows !== this.chats.length
            &&
            !this.allItemsLoaded
        ) {
            this.maxRows = this.chats.length;
            this.$emit('load');
        }
    }

    private created(): void {
        this.$watch(() => this.chats, chats => {
            if (chats.length < this.maxRows) {
                this.start = 0;

                (this.$refs.root as HTMLElement).scrollTop = 0;
            }
        })
    }

    render() {
        return (
            <div class={styles.chatsList}>
                <div
                    onScroll={this.onScroll}
                    style={this.scrollableWrapperStyle}
                    ref="root"
                >
                    <div style={this.topFakeElementStyle} />
                    {this.chats.slice(this.start, this.start + visibleRows + 1).map(item =>
                        <ChatsItem
                            style={this.rowStyle}
                            chat={item}
                            key={item.id}
                        />
                    )}
                    <div style={this.bottomFakeElementStyle} />
                </div>
                {this.allItemsLoaded && <span class={styles.chatsListMessage}>Все чаты загружены</span>}
            </div>
        )
    }
}
