<template>
    <div class="card mx-auto mt-5" id="register-card">
        <div class="card-header">
            <h4 class="text-center">Register</h4>
        </div>
        <div class="card-body">
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <p class="mt-2">Already registered? <router-link :to="{ name: 'login' }">login</router-link></p>
            </form>
        </div>
    </div>
</template>
<script>
    export default{

    }
</script>
<style></style>