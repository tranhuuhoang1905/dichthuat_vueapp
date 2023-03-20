<template>
    <div class="container-xl">
        <nav class="navbar navbar-expand-lg navbar-light bg-main">
            <div class="collapse navbar-collapse d-flex justify-content-around ">
                <div class="text-center py-4">
                    <span class="text-white">Laravel Vue CRUD Example</span>
                </div>
                <div class="navbar-nav ">
                    <router-link to="/admin" class="nav-item nav-link p-4 text-white">Dashboard</router-link>
                    <button class="btn btn-danger mb-2" @click="logoutSubmit">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions(['logout']),
        logoutSubmit() {
            this.logout(this.loginData);
        },
        reloadPage() {
            location.reload();
        },
    },
    computed: {
    },
    mounted() {
        console.log(this.loginResponse)
    }
}
</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.bg-main {
    background-color: #091e42f2;
}
</style>