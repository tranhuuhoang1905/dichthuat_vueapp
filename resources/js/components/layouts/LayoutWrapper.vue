<template>
    <!-- Begin page -->
    <div id="layout-wrapper">

        <HeaderLayout />

        <!-- ========== Left Sidebar Start ========== -->
        <LeftSidebar />
        <!-- Left Sidebar End -->

        <!-- ============================================================== -->
        <!-- Start right Content here -->
        <!-- ============================================================== -->
        <div class="main-content">

            <div class="page-content">
                <div class="container-fluid">

                    <!-- start page title -->
                    <div class="row">
                        <div class="col-12">
                            <div class="page-title-box d-flex align-items-center justify-content-between">
                                <h4 class="mb-0">Dashboard</h4>

                                <div class="page-title-right">
                                    <ol class="breadcrumb m-0">
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Nazox</a></li>
                                        <li class="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    <!-- end page title -->
                    <router-view></router-view>

                </div> <!-- container-fluid -->
            </div>
            <!-- End Page-content -->

            <FooterLayout />
        </div>
        <!-- end main content-->

    </div>

    <!-- END layout-wrapper -->
</template>
<script>

import LeftSidebar from './LeftSidebar.vue';
import HeaderLayout from './HeaderLayout.vue';
import FooterLayout from './FooterLayout.vue';
export default {
    components: {
        LeftSidebar,
        HeaderLayout,
        FooterLayout
    },
}
</script>