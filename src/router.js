import Vue from "vue";
import Router from "vue-router";
import MainLayout from "@/layouts/Main";

Vue.use(Router);

const router = new Router({
    base: process.env.BASE_URL,
    // mode: process.env.NODE_ENV === "production" ? "history" : "history",
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: "/",
            redirect: "home",
            component: MainLayout,
            meta: {
                authRequired: true,
                hidden: true,
            },
            children: [
                {
                    path: "/home",
                    meta: {
                        title: "DevPoint Home",
                    },
                    component: () => import("./views/home/"),
                },
            ],
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    next();
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

export default router;
