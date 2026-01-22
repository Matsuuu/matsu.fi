import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { withTailwind } from "../css/tailwind";

@customElement("back-button")
@withTailwind
export class BackButton extends LitElement {
    @property({ type: String })
    to = "/";

    render() {
        return html`<a class="text-white inline-flex gap-1 items-center" href="${this.to}"
            ><span class="text-[#87c095]">cd</span> ..${Blinker()}</a
        >`;
    }

    static styles = css`
        .blinker {
            width: 1ch;
            height: 2ch;
            background: #ff38a2;
            animation: 1.6s ease-in-out blink infinite;
        }

        @keyframes blink {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    `;
}

function Blinker() {
    return html`<div class="blinker"></div>`;
}
