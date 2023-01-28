<template>
    <div class="card">
        <div class="card-header">
            <router-link :to="{ name: 'login' }" v-if="$store.getters.getToken == 0" class="btn btn-primary me-2">Login</router-link>
            <button type="button" v-if="$store.getters.getToken !== 0" class="btn btn-danger me-2" @click="logout">Logout</button>
            <router-link :to="{ name: 'register' }" v-if="$store.getters.getToken == 0" class="btn btn-secondary me-2">Register</router-link>
            <router-link :to="{ name: 'product.create' }" v-if="$store.getters.getToken !== 0" class="btn btn-success">Add Product</router-link>
            <input type="search" v-model="keyword" class="form-control d-inline float-end" placeholder="Search" id="keyword">
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="(products.data ?? '').length">
                            <tr v-for="(product, index) in products.data" :key="index">
                                <td>{{ (products.current_page - 1) * products.per_page + index + 1 }}</td>
                                <td>{{ product.name }}</td>
                                <td>{{ product.description }}</td>
                                <td>{{ product.price }}</td>
                                <td>
                                    <router-link 
                                        :to="{
                                            name: 'product.edit',
                                            params: { id: product.id },
                                        }"
                                        class="btn btn-sm btn-warning me-2"
                                    >Edit</router-link>
                                    <a href="" class="btn btn-sm btn-danger" @click.prevent="destroy(product.id)">Delete</a>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="5"><h5 class="text-center text-danger">No data</h5></td>
                            </tr>
                        </tbody>
                    </table>
                    <Bootstrap5Pagination class="justify-content-center" :data="products" @pagination-change-page="getProducts" :limit="2"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { useRouter } from "vue-router"
import { useStore } from 'vuex'
export default {
    name:"products",
    components:{
        Bootstrap5Pagination
    },
    
    data(){
        return {
            products:[],
            keyword: null,
        }
    },

    mounted() {
        this.getProducts();
    },

    watch: {
        keyword(after, before) {
            this.getProducts();
        }
    },

    methods: {
        async getProducts(page=1){
                await axios.get(`/api/products?page=${page}`, { params: { keyword: this.keyword } }).then(({data})=>{
                    this.products = data
                    console.log(keyword.value);
                }).catch(({ response })=>{
                    console.error(response)
                })
        },

        destroy(id) {
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .delete("/api/product/" + id)
                        .then((res) => {
                            if (res.status === 200) {
                                this.getProducts();
                                this.$swal(
                                        'Deleted!',
                                        res.data.message,
                                        'success'
                                    )
                            }
                        })
                        .catch(() => {});
                }
            })
        },
        
    },
    setup(){
            const router = useRouter();
            const store = useStore();

            function logout(){
                store.dispatch('removeToken');
                router.push({name:'login'})
            }

            return {
                logout
            }
        }
};
</script>
<style lang="">
</style>
