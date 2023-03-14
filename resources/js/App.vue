<template>
    <!-- <router-view></router-view> -->
    <div v-if="$route.path === '/' || $route.path === '/login'">
        <login />
    </div>
    <!-- <router-view></router-view> -->
    <div v-else-if="$route.path == '/register'">
        <register />
    </div>
    <!-- <div style="" class="d-flex unauthorized" v-else>
        <admin />
    </div> -->
    <div style="" class="d-flex unauthorized" v-else-if="
        !loginResponse.authenticated">
        <login />
    </div>
    <div class="container" v-else>
        <div class="text-center" style="margin: 20px 0px 20px 0px;">
            <span class="text-secondary">Laravel Home Example</span>
        </div>
        <NavbarView />
        <br />
        <router-view></router-view>
    </div>
</template>
<script>
import login from './components/account/Login.vue';
import register from './components/account/Register.vue';
import NavbarView from './components/backend/view/NavBarView.vue'
export default {
    components: {
        login,
        NavbarView,
        register
    },
    computed: {
        loginResponse() {
            let output = undefined;

            if (
                this.$store.getters.getLoginResponse.authenticated !==
                undefined &&
                output == undefined
            ) {
                output = this.$store.getters.getLoginResponse;
            }

            if (
                JSON.parse(sessionStorage.getItem('loginResponse')) !==
                undefined &&
                output == undefined
            ) {
                output = JSON.parse(sessionStorage.getItem('loginResponse'));
            }

            if (output == undefined) {
                output = {
                    authenticated: false,
                };
            }
            return output;
        },

        authUser() {
            if (this.$store.getters.getAuthUser.id !== undefined) {
                return this.$store.getters.getAuthUser;
            }
            return JSON.parse(sessionStorage.getItem('authUser'));
        },
    },
    mounted() {
        // console.log(this.loginResponse)
        console.log(this.authUser)
        // const parsedAuthUser = JSON.parse(this.authUser)
        // console.log(parsedAuthUser)
    }
}
</script>
