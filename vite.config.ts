import { Plugin, defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "child_process";

export default defineConfig({
    plugins: [
        //
        tailwindcss(),
        runCEMAnalyze(),
    ],
});

export function runCEMAnalyze(): Plugin {
    function analyze() {
        execSync("npm run cem:analyze");
        console.log("[run-cem]: CEM analyzed");
    }

    return {
        name: "run-cem",
        configureServer() {
            analyze();
        },
        handleHotUpdate({ file }) {
            if (file.endsWith("custom-elements.json")) {
                return;
            }
            analyze();
        },
    };
}
