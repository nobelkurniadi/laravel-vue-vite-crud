import "./bootstrap";
import { createApp } from "vue";
import router from "./routers";
import App from "./components/App.vue";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import store from './store'


const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.mount("#app");
