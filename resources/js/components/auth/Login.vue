<template>
    <div class="card mx-auto mt-5" id="login-card">
        <div class="card-header">
            <h4 class="text-center">Please login</h4>
        </div>
        <div class="card-body">
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <p class="mt-2">Don't have account? <router-link :to="{ name: 'register' }">Register now</router-link></p>
            </form>
        </div>
    </div>
</template>
<script>
    export default{

    }
</script>
<style></style>