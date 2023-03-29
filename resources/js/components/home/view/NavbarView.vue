<template>
  <div class="navbar_home">
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm justify-content-between">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="/assets/images/logo-sm-dark.png" alt="" height="22" />
            </span>
            <span class="logo-lg">
              <img src="/assets/images/logo-dark.png" alt="" height="20" />
            </span>
          </router-link>
          <router-link to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="/assets/images/logo-sm-light.png" alt="" height="22" />
            </span>
            <span class="logo-lg">
              <img src="/assets/images/logo-light.png" alt="" height="20" />
            </span>
          </router-link>
        </div>
      </div>
      <div class="d-flex pe-0 pe-lg-3">
        <div class="d-flex align-items-center" v-if="checkNavigation()">
          <a href="/admin/dashboard"
            class="btn-all-add-edit d-flex align-items-center rounded navbar_menu nav-item nav-link py-2 px-3 text-white">
            Dashboard
          </a>
        </div>
        <div class="dropdown d-none d-lg-inline-block ml-1">
          <button type="button" class="btn header-item noti-icon waves-effect" data-toggle="fullscreen">
            <i class="ri-fullscreen-line"></i>
          </button>
        </div>

        <div class="dropdown d-inline-block">
          <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="ri-notification-3-line"></i>
            <span class="noti-dot"></span>
          </button>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
            aria-labelledby="page-header-notifications-dropdown">
            <div class="p-3">
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="m-0">Notifications</h6>
                </div>
                <div class="col-auto">
                  <a href="#!" class="small"> View All</a>
                </div>
              </div>
            </div>
            <div data-simplebar style="max-height: 230px">
              <a href="" class="text-reset notification-item">
                <div class="media">
                  <div class="avatar-xs mr-3">
                    <span class="avatar-title bg-primary rounded-circle font-size-16">
                      <i class="ri-shopping-cart-line"></i>
                    </span>
                  </div>
                  <div class="media-body">
                    <h6 class="mt-0 mb-1">Your order is placed</h6>
                    <div class="font-size-12 text-muted">
                      <p class="mb-1">
                        If several languages coalesce the grammar
                      </p>
                      <p class="mb-0">
                        <i class="mdi mdi-clock-outline"></i> 3 min ago
                      </p>
                    </div>
                  </div>
                </div>
              </a>
              <a href="" class="text-reset notification-item">
                <div class="media">
                  <img src="/assets/images/users/avatar-3.jpg" class="mr-3 rounded-circle avatar-xs" alt="user-pic" />
                  <div class="media-body">
                    <h6 class="mt-0 mb-1">James Lemire</h6>
                    <div class="font-size-12 text-muted">
                      <p class="mb-1">It will seem like simplified English.</p>
                      <p class="mb-0">
                        <i class="mdi mdi-clock-outline"></i> 1 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </a>
              <a href="" class="text-reset notification-item">
                <div class="media">
                  <div class="avatar-xs mr-3">
                    <span class="avatar-title bg-success rounded-circle font-size-16">
                      <i class="ri-checkbox-circle-line"></i>
                    </span>
                  </div>
                  <div class="media-body">
                    <h6 class="mt-0 mb-1">Your item is shipped</h6>
                    <div class="font-size-12 text-muted">
                      <p class="mb-1">
                        If several languages coalesce the grammar
                      </p>
                      <p class="mb-0">
                        <i class="mdi mdi-clock-outline"></i> 3 min ago
                      </p>
                    </div>
                  </div>
                </div>
              </a>

              <a href="" class="text-reset notification-item">
                <div class="media">
                  <img src="/assets/images/users/avatar-4.jpg" class="mr-3 rounded-circle avatar-xs" alt="user-pic" />
                  <div class="media-body">
                    <h6 class="mt-0 mb-1">Salena Layfield</h6>
                    <div class="font-size-12 text-muted">
                      <p class="mb-1">
                        As a skeptical Cambridge friend of mine occidental.
                      </p>
                      <p class="mb-0">
                        <i class="mdi mdi-clock-outline"></i> 1 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="p-2 border-top">
              <a class="btn btn-sm btn-link font-size-14 btn-block text-center" href="javascript:void(0)">
                <i class="mdi mdi-arrow-right-circle mr-1"></i> View More..
              </a>
            </div>
          </div>
        </div>

        <div class="dropdown d-inline-block user-dropdown" v-if="checkNavigation()">
          <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <img class="rounded-circle header-profile-user" src="/assets/images/users/avatar-2.jpg" alt="Header Avatar" />
            <span class="d-none d-xl-inline-block ml-1">Kevin</span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <a href="#" class="dropdown-item"><i class="ri-user-line align-middle mr-1"></i> Profile</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item text-danger" href="#" @click="logoutSubmit"><i
                class="ri-shut-down-line align-middle mr-1 text-danger"></i>
              Logout</a>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-around pe-2 pe-lg-4" v-else>
          <router-link :to="{ name: 'login' }"
            class="btn-all-add-edit d-flex align-items-center rounded py-2 px-3 me-3 text-white">Login
          </router-link>
          <router-link :to="{ name: 'register' }"
            class="btn-all-add-edit d-flex align-items-center rounded py-2 px-2 text-white">Register
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { store } from "../../../store/store";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      navigationDisabled: false,
    };
  },
  methods: {
    ...mapActions(["logout"]),
    logoutSubmit() {
      this.logout(this.loginData);
    },
    reloadPage() {
      location.reload();
    },
    checkNavigation() {
      const loginResponse =
        JSON.parse(sessionStorage.getItem("loginResponse")) ?? {};
      return (
        this.$store.getters.getLoginResponse.authenticated ||
        loginResponse.authenticated ||
        false
      );
      if (loginResponse) {
        this.navigationDisabled = true;
      }
      this.navigationDisabled = false;
    },
  },
  computed: {
  },
  mounted() {
    console.log(this.loginResponse);
  },
};
</script>


