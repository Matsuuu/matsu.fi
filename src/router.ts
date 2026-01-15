import { HomeView } from "./views/HomeView";
import { TechnologiesView } from "./views/TechnologiesView";
import { RenderRootNode, html, render } from "lit";
import { Suunta } from "suunta";

const routes = [
    {
        path: "/",
        view: HomeView,
        title: "Matsu Frontend Template - Home",
    },
    {
        path: "/technologies",
        view: TechnologiesView,
        title: "Matsu Frontend Template - Technologies",
    },
] as const;

type AppRoute = (typeof routes)[number];

const renderer = (view: unknown, route: AppRoute, renderTarget: RenderRootNode) => {
    render(html`${view}`, renderTarget);
};

const routerOptions = {
    routes,
    renderer,
    target: document.body,
};

const router = new Suunta(routerOptions);

export function startRouter() {
    router.start();
}
