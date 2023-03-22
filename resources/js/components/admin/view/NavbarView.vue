<template>
    <!-- <div class="container-xl"> -->
        <nav class="navbar navbar-expand-lg navbar-light bg-main">
            <div class="collapse navbar-collapse d-flex justify-content-around ">
                <div class="text-center py-4">
                    <span class="text-white">Laravel Admin Example</span>
                </div>
                <div class="navbar-nav ">
                    <router-link to="/" class="nav-item nav-link p-4 text-white">Home</router-link>
                    <router-link to="/admin/languages" class="nav-item nav-link p-4 text-white">Languages</router-link>
                    <router-link to="/admin/language/add" class="nav-item nav-link p-4 text-white">Add
                        Language</router-link>
                    <router-link to="/admin/words" class="nav-item nav-link p-4 text-white">Words</router-link>
                    <router-link to="/admin/word/add" class="nav-item nav-link p-4 text-white">Add
                        Word</router-link>
                    <router-link to="/admin/user-manager" class="nav-item nav-link p-4 text-white">User manager
                    </router-link>
                    <button class="btn btn-danger mb-2" @click="logoutSubmit">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    <!-- </div> -->
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions(['logout']),
        logoutSubmit() {
            this.logout(this.loginData);
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