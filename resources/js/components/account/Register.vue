<script>
import { required, email } from "vuelidate/lib/validators";
import { mapGetters, mapMutations, mapActions } from "vuex";
// import {
//   authMethods,
//   authFackMethods,
//   notificationMethods
// } from "@/state/helpers";
export default {
  data() {
    return {
      registerData: {
        username: "",
        email: "",
        password: "",
        repassword: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      loginResponse: "getLoginResponse",
    }),
  },
  validations: {
    registerData: {
      username: { required },
      email: { required, email },
      password: { required },
      repassword: { required },
    },
  },
  created() {
    document.body.classList.add("auth-body-bg");
  },
  methods: {
    // ...authMethods,
    // ...authFackMethods,
    // ...notificationMethods,
    // Try to register the user in with the email, username
    // and password they provided.
    ...mapActions(["registeruser"]),
    tryToRegisterIn() {
      const { email, username, password, repassword } = this.registerData;
      if (email && username && password && repassword) {
        this.registeruser(this.registerData);
      }
    },
  },
  mounted() {
  },
};
</script>

<template>
  <div class="login_register">
    <div class="home-btn d-none d-sm-block">
      <a href="/">
        <i class="mdi mdi-home-variant h2 text-white"></i>
      </a>
    </div>
    <div>
      <div class="container-fluid p-0">
        <div class="row no-gutters">
          <div class="col-lg-4">
            <div class="authentication-page-content d-flex align-items-center min-vh-100">
              <div class="w-100">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <div>
                      <div class="text-center">
                        <div>
                          <a href="/" class="logo">
                            <img src="/assets/images/logo-dark.png" height="20" alt="logo" />
                          </a>
                        </div>

                        <h4 class="font-size-18 mt-5 mt-md-3">Register account</h4>
                        <p class="text-muted">
                          Get your free Nazox account now.
                        </p>
                      </div>

                      <div class="p-2 mt-5 mt-md-3">
                        <form class="form-horizontal" @submit.prevent="tryToRegisterIn">
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-user-2-line auti-custom-input-icon"></i>
                            <label for="username">Username</label>
                            <input v-model="registerData.username" type="text" class="form-control" id="username"
                              placeholder="Enter username" />
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-mail-line auti-custom-input-icon"></i>
                            <label for="useremail">Email</label>
                            <input v-model="registerData.email" type="email" class="form-control" id="useremail"
                              placeholder="Enter email" />
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-lock-2-line auti-custom-input-icon"></i>
                            <label for="userpassword">Password</label>
                            <input v-model="registerData.password" type="password" class="form-control" id="userpassword"
                              placeholder="Enter password" />
                          </div>
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-lock-2-line auti-custom-input-icon"></i>
                            <label for="userpassword">Repassword</label>
                            <input v-model="registerData.repassword" type="password" class="form-control"
                              id="userrepassword" placeholder="Enter repassword" />
                          </div>

                          <div class="text-center">
                            <button class="btn btn-all-add-edit w-md waves-effect waves-light" type="submit">
                              Register
                            </button>
                          </div>
                        </form>
                      </div>

                      <div class="mt-2 text-center">
                        <p>
                          Already have an account ?
                          <router-link :to="{ name: 'login' }"
                            class="font-weight-medium text-login-register">Login</router-link>
                        </p>
                        <p>
                          © 2020 Nazox. Crafted with
                          <i class="mdi mdi-heart text-danger"></i> by
                          Themesdesign
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="authentication-bg">
              <div class="bg-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>