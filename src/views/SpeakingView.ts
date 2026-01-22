import { html } from "lit";
import "../components/back-button";
import "../components/listing-block";
import { LucideIcon } from "../icons/lucide";
import { Workflow } from "lucide";

export function SpeakingView() {
    return () => html`
        <div class="flex flex-col h-full gap-2 mx-auto mt-[20vh] md:max-w-[60vw]">
            <back-button></back-button>
            <div class="flex justify-between gap-18">
                <div class="flex flex-col gap-2">
                    <h1 class="font-semibold text-2xl text-white inline-flex items-center gap-1">
                        ${LucideIcon(Workflow)} Projects
                    </h1>
                </div>

                <div class="flex flex-col">
                    <listing-block
                        href="https://github.com/Matsuuu/web-component-devtools"
                        title="Web Component Devtools"
                        img="https://matsuuu.github.io/web-component-devtools/73c3b3ad.png"
                    >
                        <p>
                            Web Component DevTools is aimed at all developers working with Web Components. The tooling
                            provided creates a new Chrome Devtools panel, which allows a quick look at the custom
                            elements on the current page, and enables modification of attributes and properties of said
                            components.
                        </p>
                    </listing-block>
                </div>
            </div>
        </div>
    `;
}
