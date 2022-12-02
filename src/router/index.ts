import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import {pagesRoutes, routesConfig} from "./routes";
import services from "@/api"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [...routesConfig]


const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes,
})

const isAuthenticated = async (): Promise<boolean> => {
    try {
        await services.auth.userList();
        return true
    } catch(e) {
        console.log(e)
        return false
    }
};

router.beforeEach(async (to, from, next): Promise<void> => {
    if (to.matched.some((route) => route.meta?.requiresAuth)) {
        if (await isAuthenticated()) {
            next();

        } else {
            next(pagesRoutes.signIn.path);
        }
    } else {
        if (await isAuthenticated() && (to.path === pagesRoutes.signIn.path || to.path === pagesRoutes.signUp.path)) {
            next(pagesRoutes.chats.path)
        } else {
            next();
        }
    }
});

interface routeData {
    name: string | null | undefined,
    path: string
}

router.afterEach((to): void => {
    const statisticString: string | null = localStorage.getItem('router-statistic')
    const routeData: routeData = {name: to.name, path: to.path};


    if (statisticString) {
        const statistic = JSON.parse(statisticString);
        statistic.push(routeData)
        localStorage.setItem('router-statistic', JSON.stringify(statistic))
    } else {
        localStorage.setItem('router-statistic', JSON.stringify([routeData]))
    }

})

export default router
