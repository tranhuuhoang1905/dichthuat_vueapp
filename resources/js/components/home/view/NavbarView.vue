<template>
  <div class="navbar_home">
    <nav class="navbar navbar-expand-lg navbar-light bg-main shadow-sm">
      <div class="collapse navbar-collapse d-flex justify-content-between">
        <div class="text-center py-4 px-5">
          <span class="text-white">Laravel Home Example</span>
        </div>
        <div class="navbar-nav px-5 align-items-center">
          <a href="/admin" class="navbar_menu nav-item nav-link py-4 text-white">Dashboard
                    <div class="border_link"></div>
                </a>
          <button
            class="btn-logout bg-white text-black py-2 px-4 rounded-1 border border-0"
            @click="logoutSubmit"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["logout"]),
    logoutSubmit() {
      this.logout(this.loginData);
    },
    reloadPage() {
      location.reload();
    },
  },
  computed: {},
  mounted() {
    console.log(this.loginResponse);
  },
};
</script>
