<template>
    <!-- ========== Left Sidebar Start ========== -->
    <div class="vertical-menu">

        <div data-simplebar class="h-100">

            <!--- Sidemenu -->
            <div id="sidebar-menu">
                <!-- Left Menu Start -->
                <ul class="metismenu list-unstyled" id="side-menu">
                    <li class="menu-title">Menu</li>
                    <li>
                        <router-link :to="{ name: 'Admin Dashboard' }" class="waves-effect" exact active-class="active">
                            <i class="ri-dashboard-line"></i>
                            <!-- <span class="badge badge-pill badge-success float-right">3</span> -->
                            <span>Dashboard</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'All User' }" class=" waves-effect" v-if="userHasAdmin" exact tag="li"
                            active-class="active">
                            <i class="ri-calendar-2-line"></i>
                            <span>User manager</span>
                        </router-link>
                    </li>
                    <li :class="{ 'mm-active': $route.name === 'All Language' || $route.name === 'Add Language' }">
                        <a href="javascript: void(0);"
                            :class="{ 'mm-active': $route.name === 'All Language' || $route.name === 'Add Language' }"
                            class="has-arrow waves-effect">
                            <i class="ri-store-2-line"></i>
                            <span>Language</span>
                        </a>
                        <ul class="sub-menu" aria-expanded="false">
                            <li>
                                <router-link :to="{ name: 'All Language' }" exact tag="li" exact-active-class="active">All
                                    Languages</router-link>
                            </li>
                            <li v-if="userHasAdmin">
                                <router-link :to="{ name: 'Add Language' }" exact tag="li" exact-active-class="active">Add
                                    Languages</router-link>
                            </li>
                        </ul>
                    </li>
                    <li :class="{ 'mm-active': $route.name === 'All Word' || $route.name === 'Add Word' }">
                        <a href="javascript: void(0);" class="has-arrow waves-effect"
                            :class="{ 'mm-active': $route.name === 'All Word' || $route.name === 'Add Word' }">
                            <i class="ri-mail-send-line"></i>
                            <span>Word</span>
                        </a>
                        <ul class="sub-menu" aria-expanded="false">
                            <li>
                                <router-link :to="{ name: 'All Word' }" exact tag="a" exact-active-class="active">All
                                    Words</router-link>
                            </li>
                            <li>
                                <router-link v-if="userHasAdmin" :to="{ name: 'Add Word' }" exact tag="a"
                                    exact-active-class="active">Add Words</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="menu-title">Pages</li>
                    <li>
                        <router-link :to="{ name: 'Import Word From Excel' }" class=" waves-effect" v-if="userHasAdmin"
                            exact tag="li" active-class="active">
                            <i class="ri-calendar-2-line"></i>
                            <span>Import file excel</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'All Log' }" class=" waves-effect" exact tag="li" active-class="active">
                            <i class="ri-calendar-2-line"></i>
                            <span>Log Import file excel</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Translate Word From Excel' }" class=" waves-effect" exact tag="li"
                            active-class="active">
                            <i class="ri-calendar-2-line"></i>
                            <span>Translate file excel</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!-- Sidebar -->
        </div>
    </div>
    <!-- Left Sidebar End -->
</template>
<script>
import checkAccess from '@resources/js/middleware/access.js';
export default {
    data() {
        return {
            isExpanded: false
        }
    },
    methods: {
        toggleExpand() {
            this.isExpanded = !this.isExpanded;
        }
    },
    mounted() {
        // Đặt lại thuộc tính aria-expanded khi component được tải lại
        // const element = document.getElementsByClassName('has-arrow');
        // if (element) {
        //     element.setAttribute('aria-expanded', this.isExpanded);
        // }
        const element = document.querySelector('.has-arrow');
        if (element instanceof Element) {
            element.setAttribute('aria-expanded', 'true');
        }
    },
    computed: {
        userHasAdmin() {
            return checkAccess(['admin'])
        },
    }
}
</script>
