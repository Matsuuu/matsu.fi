import { html } from "lit";
import { Megaphone, Monitor, User, Workflow } from "lucide";
import "../components/data-block";

export function HomeView() {
    return () => html`
        <div
            class="flex md:justify-between justify-center md:items-center h-full gap-8 mx-8 md:flex-row flex-col md:max-w-[60vw] md:mx-auto mt-[20vh]"
        >
            <div class="flex flex-col">
                <h1 class="text-2xl text-white">Matias <b class="glow-text offset-2">"Matsu"</b> Huhta</h1>
                <p class="text-2xl text-white">Senior Software Engineer</p>

                <div class="flex flex-nowrap items-center gap-2 ">
                    ${Ball()}
                    <p class="text-white">
                        Currently on my <span class="glow-text offset-1">Developer Experience</span> Era @
                        <span class="glow-text offset-2">n8n</span>
                    </p>
                </div>
            </div>
            <div class="flex flex-col basis-1/3 gap-2 md:mx-0 mx-8">
                <div class="flex gap-2">
                    <data-block .blockData=${{ label: "Projects", href: "/projects", icon: Workflow }}></data-block>
                    <data-block .blockData=${{ label: "Work", href: "/work", icon: Monitor }}></data-block>
                </div>
                <div class="flex gap-2">
                    <data-block .blockData=${{ label: "Speaking", href: "/speaking", icon: Megaphone }}></data-block>
                    <data-block .blockData=${{ label: "Me", href: "/me", icon: User }}></data-block>
                </div>
            </div>
        </div>
    `;
}

function Ball() {
    return html` <div class="rounded-full w-3 h-3 glow"></div> `;
}
