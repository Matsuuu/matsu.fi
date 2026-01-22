import { html } from "lit";
import "../components/back-button";
import "../components/listing-block";
import { LucideIcon } from "../icons/lucide";
import { Workflow } from "lucide";

export function ProjectsView() {
    return () => html`
        <div class="flex flex-col h-full gap-2 mx-auto mt-[20vh] md:max-w-[60vw]">
            <back-button></back-button>
            <div class="flex justify-between gap-18">
                <div class="flex flex-col gap-2">
                    <h1 class="font-semibold text-2xl text-white inline-flex items-center gap-1">
                        ${LucideIcon(Workflow)} Projects
                    </h1>
                </div>

                <div class="flex flex-col gap-4">
                    <listing-block
                        href="https://github.com/Matsuuu/web-component-devtools"
                        img="https://matsuuu.github.io/web-component-devtools/73c3b3ad.png"
                    >
                        <h2 class="text-xl font-semibold text-green-600">Web Component Devtools</h2>
                        <p>
                            Web Component DevTools is aimed at all developers working with Web Components. The tooling
                            provided creates a new Chrome Devtools panel, which allows a quick look at the custom
                            elements on the current page, and enables modification of attributes and properties of said
                            components.
                        </p>
                    </listing-block>

                    <listing-block href="https://github.com/Matsuuu/pinkmare">
                        <h2 class="text-xl font-semibold pinkmare">Pinkmare</h2>
                        <p>
                            Pinkmare is a color scheme that grew from a need to have something that was at the same time
                            pretty, but also easy on the eyes.
                        </p>
                        <p>
                            This theme is dominant in a lot of my workflow from my terminal and neovim themes to even
                            this website.
                        </p>
                    </listing-block>

                    <listing-block
                        href="https://github.com/Matsuuu/suunta"
                        img="https://github.com/Matsuuu/suunta/raw/main/assets/suunta-banner.png"
                    >
                        <h2 class="text-xl font-semibold text-blue-300">Suunta</h2>
                        <p>A simple SPA routing and state management library for everyday use</p>
                        <p>
                            Suunta grew from a need to have a stable solution for managing routing, views, state and
                            forms in a frameworkless environment.
                        </p>
                        <p>
                            I mostly work around web components and vanilla environments, and needed a setup that
                            provided framework-like features fitting for my needs.
                        </p>
                    </listing-block>

                    <listing-block href="https://github.com/Matsuuu/custom-elements-language-server">
                        <h2 class="text-xl font-semibold text-amber-400">Custom Elements LanguageServer</h2>
                        <p>
                            The CELS was a passion project of mine: Creating the first Language Server implementation
                            for Custom Elements and Web Components.
                        </p>
                        <p>
                            The project was bootstrapped from pretty much non-existing editor support for these
                            technologies and was able to find it's userbase.
                        </p>
                        <p><b>This project was archived due to lack of time and other projects superseding it</b></p>
                    </listing-block>
                </div>
            </div>
        </div>
    `;
}
