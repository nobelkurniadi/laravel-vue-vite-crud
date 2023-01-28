<template>
    <div class="card mx-auto mt-5" id="register-card">
        <div class="card-header">
            <h4 class="text-center">Register</h4>
        </div>
        <div class="card-body">
            <form @submit.prevent="register">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" v-model="form.name" class="form-control" id="name">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" v-model="form.email" class="form-control" id="email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" v-model="form.password" class="form-control" id="password">
                </div>
                <div class="mb-3">
                    <label for="confirm_password" class="form-label">Confirm Password</label>
                    <input type="password" v-model="form.confirm_password" class="form-control" id="confirm_password">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <p class="mt-2">Already registered? <router-link :to="{ name: 'login' }">login</router-link></p>
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
                name :'',
                email: '',
                password: '',
                confirm_password: '',
            });
            let errors = ref([])

            const register = async() =>{
                await axios.post('/api/register',form).then(res=>{
                    if(res.data.success){
                        store.dispatch('setToken',res.data.data.token)
                        router.push({name:'product.index'})
                    }
                }).catch(e=>{
                    errors.value = e.response.data.message
                })
            }
            return{
                form,
                register,
                errors
            }
        }
    }
</script>
<style></style>