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
                        <router-link to="/admin" class="waves-effect">
                            <i class="ri-dashboard-line"></i><span
                                class="badge badge-pill badge-success float-right">3</span>
                            <span>Dashboard</span>
                        </router-link>

                    </li>

                    <li>
                        <router-link to="/admin/user-manager" class=" waves-effect">
                            <i class="ri-calendar-2-line"></i>
                            <span>User manager</span>
                        </router-link>
                    </li>

                    <li>
                        <a href="javascript: void(0);" class="has-arrow waves-effect">
                            <i class="ri-store-2-line"></i>
                            <span>Language</span>
                        </a>
                        <ul class="sub-menu" aria-expanded="false">
                            <li><router-link to="/admin/languages">All Languages</router-link></li>
                            <li><router-link to="/admin/language/add">Add Languages</router-link></li>
                        </ul>
                    </li>

                    <li>
                        <a href="javascript: void(0);" class="has-arrow waves-effect">
                            <i class="ri-mail-send-line"></i>
                            <span>Word</span>
                        </a>
                        <ul class="sub-menu" aria-expanded="false">
                            <li><router-link to="/admin/words">All Words</router-link></li>
                            <li><router-link to="/admin/word/add">Add Words</router-link></li>
                        </ul>
                    </li>

                    <li class="menu-title">Pages</li>
                    <li>
                        <router-link to="/admin/word/import-word-from-excel" class=" waves-effect">
                            <i class="ri-calendar-2-line"></i>
                            <span>Import file excel</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/word/translate-word-from-excel" class=" waves-effect">
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