<template>
    <div class="card">
        <div class="card-header">
            <h3>New Product</h3>
        </div>
        <div class="card-body">
            <form @submit.prevent="storeData">
                <div class="mb-3">
                    <label for="name" class="form-label">Product Name</label>
                    <input type="text" v-model="form.name" class="form-control" id="name" aria-describedby="emailHelp">
                    <span v-if="errors.name" class="text-danger">{{ errors.name[0] }}</span>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <input type="text" v-model="form.description" class="form-control" id="description" aria-describedby="emailHelp">
                    <span v-if="errors.description" class="text-danger">{{ errors.description[0] }}</span>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input type="text" v-model="form.price" class="form-control" id="price" aria-describedby="emailHelp">
                    <span v-if="errors.price" class="text-danger">{{ errors.price[0] }}</span>
                </div>
                <button type="submit" class="btn btn-primary me-2">Submit</button>
                <router-link :to="{name: 'product.index'}" class="btn btn-secondary">Cancel</router-link>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                name: "",
                description: "",
                price: "",
            },

            errors: {},
        };
    },

    methods: {
        storeData() {
            axios.get('/sanctum/csrf-cookie').then(response => {
                let token=localStorage.getItem("token");
                axios.post("/api/product", this.form, { 
                        headers: {
                            Authorization: `Bearer ${token}`,
                            token: token
                        }
                    })
                .then((res) => {
                    if (res.status === 201) {
                        this.form = "";
                        this.errors = "";
                        this.$router.push({ path: `/`});
                        this.$swal({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Product added successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
                .catch((err) => {
                    this.errors = err.response.data.errors;
                });
            });
            
        },
    },
};
</script>
<style lang=""></style>
