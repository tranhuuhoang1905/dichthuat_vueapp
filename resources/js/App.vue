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
    <div style="" v-else-if="
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


    <!-- <div v-else> -->
    <!-- <Layout> -->
    <!-- <PageHeader :title="title" :items="items" />
            <div class="row">
            <div class="col-xl-8">
                <Stat />
                <RevenueAnalytics />
            </div>
            <div class="col-xl-4">
                <SalesAnalytics />
                <EarningReport />
            </div>
            </div>
            <div class="row">
            <div class="col-lg-4">
                <Sources />
            </div>
            <div class="col-lg-4">
                <RecentActivity />
            </div>
            <div class="col-lg-4">
                <RevenueLocation />
            </div>
            </div>
            <div class="row">
            <div class="col-lg-4">
                <Chat />
            </div>
            <div class="col-lg-8">
                <Transaction />
            </div>
            </div> -->
    <!-- </Layout> -->
    <!-- </div> -->
</template>
<script>
import login from './components/account/Login.vue';
import register from './components/account/Register.vue';
import NavbarView from './components/backend/view/NavBarView.vue'
// import rightSidebar from './components/layouts/right-sidebar.vue'

import Layout from "./components/layouts/horizontal.vue";
export default {
    components: {
        login,
        NavbarView,
        register,
        Layout
    },
    data() {
        return {
            title: "Dashboard",
            items: [
                {
                    text: "Nazox"
                },
                {
                    text: "Dashboard",
                    active: true
                }
            ]
        };
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
