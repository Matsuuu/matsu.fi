import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { withTailwind } from "../css/tailwind";
import { when } from "lit/directives/when.js";

@customElement("listing-block")
@withTailwind
export class ListingBlock extends LitElement {
    @property({ type: String })
    href: string;

    @property({ type: String })
    img: string;

    className = "flex";

    render() {
        return html`
            <a
                class="w-full h-full flex flex-col text-white justify-center p-4 border-1 border-white gap-4 glow-hover"
                href="${this.href}"
                target="_blank"
            >
                ${when(this.img, () => drawImage(this.img))}
                <slot></slot>
            </a>
        `;
    }
}
function drawImage(img: string) {
    return html` <div class="w-20"><img class="w-full" src="${img}" /></div> `;
}
