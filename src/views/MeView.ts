import { html } from "lit";
import "../components/back-button";
import "../components/listing-block";
import { LucideIcon } from "../icons/lucide";
import { User } from "lucide";

export function MeView() {
    return () => html`
        <div class="flex flex-col h-full gap-2 mt-[20vh] md:max-w-[60vw] mx-8 md:mx-auto">
            <back-button></back-button>
            <div class="flex justify-between md:gap-18 gap-10 md:flex-row flex-col">
                <div class="flex flex-col gap-2">
                    <h1 class="font-semibold text-2xl text-white inline-flex items-center gap-1">
                        ${LucideIcon(User)} Me
                    </h1>
                </div>

                <div class="flex flex-col gap-4 text-white">
                    <h1 class="text-2xl font-semibold">
                        I'm Matias <span class="glow-text offset-1">"Matsu"</span> Huhta
                    </h1>
                    <p>A passionate Developer Experience -oriented senior engineer from Finland</p>
                    <p>
                        When I'm not working, I'm most likely brewing.
                        <a class="glow-text" href="https://www.instagram.com/matsu_brewing/"
                            >Check out Matsu Brewing for more of that.</a
                        >
                    </p>

                    <p>You can find me online at</p>

                    <ul>
                        <li class="underline hover:text-primary transition">
                            <a target="_blank" href="https://github.com/Matsuuu">GitHub</a>
                        </li>
                        <li class="underline hover:text-primary transition">
                            <a target="_blank" href="https://www.linkedin.com/in/matias-huhta-b0b159106/">LinkedIn</a>
                        </li>
                        <li class="underline hover:text-primary transition">
                            <a target="_blank" href="https://www.youtube.com/channel/UC3ySWW7VRZB7Kb_kFP1uDkQ"
                                >Youtube</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}
