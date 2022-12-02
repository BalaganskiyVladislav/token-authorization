import Vue, { VNodeData } from 'vue'

type CSSClass = (string | string[] | {
    [key: string]: boolean
})

interface DefaultAttrs {
    key?: string | number
    class?: CSSClass | CSSClass[]
    style?: VNodeData['style']
    ref?: VNodeData['ref']
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExtendAttrs {}

export class VueComponent<P> extends Vue {
    public $props!: ExtendAttrs & P & DefaultAttrs
}
