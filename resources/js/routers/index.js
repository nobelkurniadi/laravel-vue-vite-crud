import { createRouter, createWebHistory } from "vue-router";

import Index from "../components/product/Index.vue";
import Create from "../components/product/Create.vue";
import Edit from "../components/product/Edit.vue";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";

const routes = [
    { 
        path: "/", 
        name: "product.index", 
        component: Index 
    },
    { 
        path: "/create", 
        name: "product.create", 
        component: Create 
    },
    { 
        path: "/product/:id", 
        name: "product.edit", 
        component: Edit
    },
    { 
        path: "/login", 
        name: "login", 
        component: Login
    },
    { 
        path: "/register", 
        name: "register", 
        component: Register
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
