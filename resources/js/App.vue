<template>
    <div class="app_vue">
        <div v-if="$route.path === '/login'">
            <login />
        </div>
        <div v-else-if="$route.path == '/register'">
            <register />
        </div>
        <div v-else-if="isAdminRoute">
            <LayoutWrapper />
            <RightSidebar />
        </div>
        <div class="" v-else>
            <div class="container-xl">
                <HomeNavbarView />
            </div>
            <div class="container">
                <br />
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import login from './components/account/Login.vue';
import register from './components/account/Register.vue';
import LayoutWrapper from './components/layouts/LayoutWrapper.vue';
import RightSidebar from './components/layouts/RightSidebar.vue';

import HomeNavbarView from './components/home/view/NavbarView.vue';
export default {
    components: {
        login,
        LayoutWrapper,
        RightSidebar,
        HomeNavbarView,
        register,
    },
    computed: {
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