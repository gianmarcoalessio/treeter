import { createRouter, createWebHistory } from 'vue-router'
import Main from "@comp/main.vue"
import TreetView from "@comp/treetView.vue"

const routes = [
    { path: '/', component: Main },
    { path: '/treet/:id', component: TreetView },
]

export const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})