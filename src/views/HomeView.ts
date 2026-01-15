import { html } from "lit";
import { Megaphone, Monitor, User, Workflow } from "lucide";
import "../components/data-block";

export function HomeView() {
    return () => html`
        <div class="flex md:justify-between justify-center md:items-center h-full gap-6 mx-8 md:flex-row flex-col">
            <div class="flex flex-col">
                <h1 class="text-2xl text-white">Matias <b class="glow-text offset-2">"Matsu"</b> Huhta</h1>
                <p class="text-2xl text-white">Senior Software Engineer</p>

                <div class="flex flex-nowrap items-center gap-2 ">
                    ${Ball()}
                    <p class="text-white">
                        Currently focusing on <span class="glow-text offset-1">Developer Experience</span> @
                        <span class="glow-text offset-2">n8n</span>
                    </p>
                </div>
            </div>
            <div class="flex gap-2 flex-wrap md:justify-end justify-center">
                <data-block .blockData=${{ label: "Projects", href: "/projects", icon: Workflow }}></data-block>
                <data-block .blockData=${{ label: "Work", href: "/work", icon: Monitor }}></data-block>
                <data-block .blockData=${{ label: "Speaking", href: "/speaking", icon: Megaphone }}></data-block>
                <data-block .blockData=${{ label: "Me", href: "/me", icon: User }}></data-block>
            </div>
        </div>
    `;
}

function Ball() {
    return html` <div class="rounded-full w-3 h-3 glow"></div> `;
}
