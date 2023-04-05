<template>
    <div class="app_vue">
        <div v-if="$route.path === '/login' || $route.path.startsWith('/login-challenge/')">
            <loginLayout />
        </div>

        <div v-else-if="$route.path == '/register'">
            <register />
        </div>
        <div v-else-if="isAdminRoute">
            <LayoutWrapper :authUser="authUser" />
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
import loginLayout from './components/account/LoginLayout.vue';
import register from './components/account/Register.vue';
import LayoutWrapper from './components/layouts/LayoutWrapper.vue';
import RightSidebar from './components/layouts/RightSidebar.vue';

import HomeNavbarView from './components/home/view/NavbarView.vue';
export default {
    components: {
        loginLayout,
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
            return JSON.parse(localStorage.getItem('authUser'));
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