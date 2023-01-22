<template>
    <div class="card">
        <div class="card-header">
            <router-link :to="{ name: 'product.create' }" class="btn btn-primary">Add Product</router-link>
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
                        <tbody>
                            <tr v-for="(product, index) in products.data" :key="index">
                                <td>{{ ++index }}</td>
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
                    </table>
                    <Bootstrap5Pagination class="justify-content-center" :data="products" @pagination-change-page="getProducts" :limit="2"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
export default {
    name:"products",
    components:{
        Bootstrap5Pagination
    },
    
    data(){
        return {
            products:{
                type:Object,
                default:null
            }
        }
    },

    mounted() {
        this.getProducts();
    },

    methods: {
        async getProducts(page=1){
                await axios.get(`/api/products?page=${page}`).then(({data})=>{
                    this.products = data
                    console.log(data);
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
                                this.fetchData();
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
};
</script>
<style lang=""></style>
