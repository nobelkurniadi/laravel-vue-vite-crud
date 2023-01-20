import { createRouter, createWebHistory } from "vue-router";

import Index from "../components/product/Index.vue";
import Create from "../components/product/Create.vue";
import Edit from "../components/product/Edit.vue";

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
