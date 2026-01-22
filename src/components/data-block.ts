import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { withTailwind } from "../css/tailwind";
import { LucideIcon } from "../icons/lucide";
import { IconNode } from "lucide";

export interface BlockData {
    label: string;
    icon: IconNode;
    href: string;
}

@customElement("data-block")
@withTailwind
export class DataBlock extends LitElement {
    @property({ type: String })
    blockData: BlockData;

    className = "flex aspect-square basis-1/2";

    render() {
        return html`
            <a
                class="w-full h-full flex flex-col text-white text-center items-center justify-center p-4 border-1 border-white glow-hover"
                href="${this.blockData.href}"
            >
                ${LucideIcon(this.blockData.icon)}
                <p>${this.blockData.label}</p>
            </a>
        `;
    }
}
