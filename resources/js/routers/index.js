import { createRouter, createWebHistory } from "vue-router";

import Index from "../components/product/Index.vue";
import Create from "../components/product/Create.vue";
import Edit from "../components/product/Edit.vue";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";
import store from '../store'



const routes = [
    { 
        path: "/", 
        name: "product.index", 
        component: Index,
        meta:{
            requiresAuth:true
        }
    },
    { 
        path: "/create", 
        name: "product.create", 
        component: Create,
        meta:{
            requiresAuth:true
        }
    },
    { 
        path: "/product/:id", 
        name: "product.edit", 
        component: Edit,
        meta:{
            requiresAuth:true
        }
    },
    { 
        path: "/login", 
        name: "login", 
        component: Login,
        meta:{
            requiresAuth:false
        }
    },
    { 
        path: "/register", 
        name: "register", 
        component: Register,
        meta:{
            requiresAuth:false
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to,from) =>{
    if(to.meta.requiresAuth && store.getters.getToken == 0){
        return { name : 'login'}
    }
    if(to.meta.requiresAuth == false && store.getters.getToken != 0){
        return { name : 'product.index'}
    }
})

export default router;
