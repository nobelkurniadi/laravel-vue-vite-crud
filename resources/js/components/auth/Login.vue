<template>
    <div class="card mx-auto mt-5" id="login-card">
        <div class="card-header">
            <h4 class="text-center">Please login</h4>
        </div>
        <div class="card-body">
            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" v-model="form.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" v-model="form.password" class="form-control" id="exampleInputPassword1">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <p class="mt-2">Don't have account? <router-link :to="{ name: 'register' }">Register now</router-link></p>
            </form>
        </div>
    </div>
</template>
<script>
    import { reactive,ref } from 'vue'
    import { useRouter } from "vue-router"
    import { useStore } from 'vuex'
    export default{
        setup(){
            const router = useRouter()
            const store = useStore()

            let form = reactive({
                email: '',
                password: ''
            });
            let error = ref('')

            const login = async() =>{
                await axios.post('/api/login',form).then(res=>{
                    if(res.data.success){
                        store.dispatch('setToken',res.data.data.token);
                        router.push({name:'product.index'})
                    }else{
                        error.value = res.data.message;
                    }
                })
            }
            return{
                form,
                login,
                error
            }
        }
    }
</script>
<style></style>