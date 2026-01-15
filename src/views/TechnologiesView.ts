import { html } from "lit";

export function TechnologiesView() {
    return () => html`
        <div class="flex flex-col items-center justify-center h-full gap-2">
            <h3 class="font-semibold text-2xl text-white">🔨</h3>
            <h1 class="font-semibold text-2xl text-white">Technologies</h1>

            <ul class="text-center font-bold text-cyan-800">
                <li>Lit</li>
                <li>Tailwind</li>
                <li>Suunta</li>
                <li>Lucide</li>
                <li>Vite</li>
                <li>WebAwesome</li>
            </ul>

            <a class="underline" href="/">Take me back</a>
            <a class="underline" href="https://github.com/Matsuuu/frontend-template">🔗 Take me to the source</a>
        </div>
    `;
}
