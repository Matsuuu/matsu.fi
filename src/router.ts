import { HomeView } from "./views/HomeView";
import { RenderRootNode, html, render } from "lit";
import { Suunta } from "suunta";
import { ProjectsView } from "./views/ProjectsView";

const routes = [
    {
        path: "/",
        view: HomeView,
        title: "matsu.fi - Home",
    },
    {
        path: "/projects",
        view: ProjectsView,
        title: "matsu.fi - Projects",
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
