import { html } from "lit";
import "../components/back-button";
import "../components/listing-block";
import { LucideIcon } from "../icons/lucide";
import { Monitor } from "lucide";

export function WorkView() {
    return () => html`
        <div class="flex flex-col h-full gap-2 mt-[20vh] md:max-w-[60vw] mx-8 md:mx-auto">
            <back-button></back-button>
            <div class="flex justify-between md:gap-18 gap-10 md:flex-row flex-col">
                <div class="flex flex-col gap-2">
                    <h1 class="font-semibold text-2xl text-white inline-flex items-center gap-1">
                        ${LucideIcon(Monitor)} Work
                    </h1>
                </div>

                <div class="flex flex-col gap-4">
                    <listing-block href="https://n8n.io/">
                        <object class="max-w-50" data="/n8n-white.svg" type="image/svg+xml"></object>
                        <h2 class="text-xl font-semibold">Senior Software Engineer DX @ n8n</h2>
                        <p>
                            Focusing on all things Developer Experience. From enhancing local development speed and
                            feedback loops to providing better tooling.
                        </p>
                        <p>
                            My goal is to make every engineer in the company more efficient and make their day to day
                            work more enjoyable.
                        </p>
                    </listing-block>

                    <listing-block
                        href="https://simplr.fi/"
                        img="https://simplr.fi/wp-content/uploads/2025/09/Simplr_muki-scaled.png"
                    >
                        <h2 class="text-xl font-semibold">CTO, Tech Lead @ Simplr</h2>
                        <p>Founded and lead the technical side of a small software consultancy.</p>
                        <p>
                            Day to day work consisted of moving customer projects forward and enhancing developer
                            experience across all of our client's teams.
                        </p>
                    </listing-block>

                    <listing-block href="https://www.siili.com/">
                        <object class="max-w-30" data="/siili.svg" type="image/svg+xml"></object>
                        <h2 class="text-xl font-semibold">Consultant @ Siili Solutions</h2>
                        <p>A hands-on consultant on national projects.</p>
                    </listing-block>

                    <listing-block href="https://www.linkedin.com/in/matias-huhta-b0b159106/?skipRedirect=true">
                        <h2 class="text-xl font-semibold">And plenty more</h2>
                        <p>Listing everything here would be a mess so you can check the rest at LinkedIn</p>
                    </listing-block>
                </div>
            </div>
        </div>
    `;
}
