import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { withTailwind } from "../css/tailwind";
import { LucideIcon } from "../icons/lucide";
import { Home } from "lucide";

@customElement("hello-world")
@withTailwind
export class HelloWorld extends LitElement {
    @property({ type: String })
    name = "World";

    render() {
        return html`<p class="text-xl font-bold">Hello ${this.name}</p>
            ${LucideIcon(Home)} `;
    }
}
