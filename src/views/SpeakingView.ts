import { html } from "lit";
import "../components/back-button";
import "../components/listing-block";
import { LucideIcon } from "../icons/lucide";
import { Megaphone } from "lucide";

export function SpeakingView() {
    return () => html`
        <div class="flex flex-col h-full gap-2 mt-[20vh] md:max-w-[60vw] mx-8 md:mx-auto">
            <back-button></back-button>
            <div class="flex justify-between md:gap-18 gap-10 md:flex-row flex-col">
                <div class="flex flex-col gap-2">
                    <h1 class="font-semibold text-2xl text-white inline-flex items-center gap-1">
                        ${LucideIcon(Megaphone)} Speaking
                    </h1>
                </div>

                <div class="flex flex-col gap-4">
                    <listing-block>
                        <h2 class="text-xl font-semibold text-link">Exploring the View Transitions API</h2>
                        <p class="text-lg">Turku <3 Frontend September 2025</p>
                        <p class="text-base font-semibold">No recording available</p>
                    </listing-block>
                    <listing-block href="https://www.youtube.com/watch?v=IwuXGD5PDSY">
                        <h2 class="text-xl font-semibold text-link">
                            Code-First Design with Zod and OpenAPI - Writing API's that spark joy
                        </h2>
                        <p class="text-lg">Future Frontend April Meetup 2025</p>
                    </listing-block>
                    <listing-block>
                        <h2 class="text-xl font-semibold text-link">You might not need a framework</h2>
                        <p class="text-lg">Turku <3 Frontend November 2024</p>
                        <p class="text-base font-semibold">No recording available</p>
                    </listing-block>
                    <listing-block>
                        <h2 class="text-xl font-semibold text-link">
                            Towards greater development experience through Web Platform API's
                        </h2>
                        <p class="text-lg">TampereJS June 2024</p>
                        <p class="text-base font-semibold">No recording available</p>
                    </listing-block>
                    <listing-block href="https://www.youtube.com/watch?v=-L1UlmMoLc0">
                        <h2 class="text-xl font-semibold text-link">
                            ALL YOUR FRONTEND ARE BELONG TO US - CRAWLING THROUGH JAVASCRIPT USING AST'S
                        </h2>
                        <p class="text-lg">Disobey 2024</p>
                    </listing-block>
                    <listing-block>
                        <h2 class="text-xl font-semibold text-link">Writing Javascript, but with types!</h2>
                        <p class="text-lg">Turku <3 Frontend October Meetup 2023</p>
                        <p class="text-base font-semibold">No recording available</p>
                    </listing-block>
                    <listing-block
                        href="https://wordpress.tv/2024/08/11/towards-greater-development-experience-through-web-platform-apis/"
                    >
                        <h2 class="text-xl font-semibold text-link">
                            Towards greater development experience through Web Platform API's
                        </h2>
                        <p class="text-lg">WordCamp Finland 2023</p>
                    </listing-block>
                    <listing-block>
                        <h2 class="text-xl font-semibold text-link">
                            Towards buildless environments through Import Maps
                        </h2>
                        <p class="text-lg">Turku <3 Frontend April meetup 2023</p>
                        <p class="text-base font-semibold">No recording available</p>
                    </listing-block>
                    <listing-block>
                        <h2 class="text-xl font-semibold text-link">
                            The Future of Development Tooling - Sharing is Caring
                        </h2>
                        <p class="text-lg">FooConf 2023</p>
                        <p class="text-base font-semibold">No recording available</p>
                    </listing-block>
                    <listing-block href="https://www.youtube.com/watch?v=otTm4W5VWu4">
                        <h2 class="text-xl font-semibold text-link">Let's write a Language Server!</h2>
                        <p class="text-lg">Turku <3 Frontend November meetup 2022</p>
                    </listing-block>
                    <listing-block href="https://www.youtube.com/watch?v=8OwnSr9Mnko">
                        <h2 class="text-xl font-semibold text-link">You might not need a mouse</h2>
                        <p class="text-lg">Aurajoki Overflow November meetup 2022</p>
                    </listing-block>
                    <listing-block href="https://www.youtube.com/watch?v=oy1hiAO5Cl0">
                        <h2 class="text-xl font-semibold text-link">Avoiding vendor lock-in through Web Components</h2>
                        <p class="text-lg">React Finland 2022</p>
                    </listing-block>
                    <listing-block>
                        <h2 class="text-xl font-semibold text-link">Writing Javascript, but with types!</h2>
                        <p class="text-lg">HelsinkiJS November meetup 2021</p>
                        <p class="text-base font-semibold">No recording available</p>
                    </listing-block>
                    <listing-block href="https://www.youtube.com/watch?v=V3PqSabh7b0">
                        <h2 class="text-xl font-semibold text-link">Web Components: Utilizing the Web Platform</h2>
                        <p class="text-lg">Turku <3 Frontend October meetup 2021</p>
                    </listing-block>
                    <listing-block href="https://www.youtube.com/watch?v=fgtS_nfMOtw">
                        <h2 class="text-xl font-semibold text-link">Web Components in React</h2>
                        <p class="text-lg">React Finland 2021</p>
                    </listing-block>
                </div>
            </div>
        </div>
    `;
}
