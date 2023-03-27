<template>
  <div class="profile">
    <div class="row">
      <div class="col-md-4">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">Profile</h4>
            <div class="form-group">
              <i class="fas fa-user text-secondary mx-3"></i>
              <router-link :to="{ name: 'Profile User' }" class="text-secondary">Profile</router-link>
            </div>
            <div class="form-group">
              <i class="fas fa-lock text-secondary mx-3"></i>
              <router-link :to="{ name: 'Change Password' }" class="text-secondary">Đổi mật
                khẩu</router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">Đổi mật khẩu</h4>
            <div class="col-md-12">
              <form @submit.prevent="updatePasswordUser">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label class="label-item">Mật khẩu cũ</label>
                      <input type="password" class="form-control" required v-model="userForm.password" />
                    </div>
                    <div class="form-group">
                      <label class="label-item">Mật khẩu mới</label>
                      <input type="password" class="form-control" required v-model="userForm.password_new" />
                    </div>
                    <div class="form-group">
                      <label class="label-item">Nhập lại mật khẩu mới</label>
                      <input type="password" class="form-control" required v-model="userForm.repassword_new" />
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-all-add-edit py-2 px-4">
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      userForm: {},
    };
  },
  methods: {
    updatePasswordUser() {
      this.userForm.email = "admin@gmail.com";
      console.log(this.userForm);
      this.axios
        .post(`/api/user/user-change-password`, this.userForm)
        .then((response) => {
          this.$router.push({ name: "Profile User" });
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  }
};
</script>
  