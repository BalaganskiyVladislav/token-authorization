import Chats from "@/views/chats";
import SignIn from "@/views/SignIn";
import SignUp from "@/views/SignUp";
import CreateChat from "@/views/CreateChat";
import {RouteConfig} from "vue-router";

type pagesRoutes = Record<string | number | symbol, RouteConfig>

export const pagesRoutes: pagesRoutes = {
    home: {
        path: '/',
        name: 'Home',
        component: Chats,

        meta: {
            requiresAuth: true,
        },
    },
    signIn: {
        path: '/signin',
        name: 'SignIn',
        component: SignIn
    },
    signUp: {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
    chats: {
        path: '/chats',
        name: 'Chats',
        component: Chats,
        meta: {
            requiresAuth: true,
        },
    },
    createChat: {
        path: '/create-chat',
        name: 'CreateChat',
        component: CreateChat,
        meta: {
            requiresAuth: true,
        },
    },
}

export const routesConfig: Array<RouteConfig> = []

Object.keys(pagesRoutes).forEach(key => {
    routesConfig.push(pagesRoutes[key as keyof pagesRoutes]);
})
