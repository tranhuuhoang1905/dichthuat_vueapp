<template>
    <div v-if="$route.path === '/login'">
        <login />
    </div>
    <div v-else-if="$route.path == '/register'">
        <register />
    </div>
    <div style="" v-else-if="
        !loginResponse.authenticated">
        <login />
    </div>
    <div class="container" v-else-if="isHomeRoute">
        <div class="text-center" style="margin: 20px 0px 20px 0px;">
            <span class="text-secondary">Laravel Home Example</span>
        </div>
        <HomeNavbarView />
        <br />
        <router-view></router-view>
    </div>
    <div class="" v-else>
        <LayoutWrapper />
        <!-- <AdminNavbarView /> -->
        <!-- <router-view></router-view> -->
        <RightSidebar />
    </div>
</template>
<script>
import login from './components/account/Login.vue';
import register from './components/account/Register.vue';
import LayoutWrapper from './components/layouts/LayoutWrapper.vue';
import RightSidebar from './components/layouts/RightSidebar.vue';

import HomeNavbarView from './components/home/view/NavbarView.vue';
// import AdminNavbarView from './components/admin/view/NavbarView.vue';
export default {
    components: {
        login,
        // AdminNavbarView,
        LayoutWrapper,
        RightSidebar,
        HomeNavbarView,
        register,
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
        isHomeRoute() {
            return !this.$route.path.startsWith("/admin") && !this.$route.path.startsWith("/admin/") && this.$route.path !== "/login" && this.$route.path !== "/register";
        },
        isAdminRoute() {
            return this.$route.path.startsWith("/admin/") || this.$route.path.startsWith("/admin");
        },

    }
}
</script>
