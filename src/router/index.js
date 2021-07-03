import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Users from "../views/Users.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/Users",
        name: "Users",
        component: Users
    },
    {
        path: "/profile/:name",
        name: "Profile",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/Profile.vue"),
        props: true
    },
    {
        path: "/AddUser",
        name: "Add User",
        component: () => import("../views/AddUser.vue")
    },
    {
        path: "/Playground",
        name: "Playground",
        component: () => import("../views/Playground.vue")
    }
];

const router = new VueRouter({
    routes
});

export default router;
