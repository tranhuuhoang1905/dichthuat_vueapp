<template>
  <div class="change_role_user">
    <div class="row d-flex justify-content-center">
      <div class="col-md-7">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">Change role user</h4>
            <div class="col-md-12">
              <form @submit.prevent="updateUser">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Email</label>
                      <input type="email" placeholder="Enter description" class="form-control" v-model="userForm.email"
                        disabled required />
                    </div>
                    <div class="form-group">
                      <label>Username</label>
                      <input type="text" placeholder="Enter description" class="form-control" v-model="userForm.name"
                        required disabled />
                    </div>
                    <div class="form-group">
                      <label>Role</label>
                      <select class="form-select" aria-label="Default select example" v-model="userForm.role" required>
                        <option v-for="role in roles" :key="role.id" :value="`${role.id}`">
                          {{ role.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-all-add-edit py-2 px-5">Change</button>
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
      roles: [],
      userForm: {},
    };
  },

  created() {
    this.axios
      .get(`/api/user/edit/${this.$route.params.id}`)
      .then((response) => {
        if (response.data.status === 200) {
          this.userForm = {
            name: response.data.data.user.name,
            email: response.data.data.user.email,
            // xử lý lại nếu role không tồn tại thì trả về null
            role: response.data.data.user.roles[0]?.id ?? null,
          };
          this.roles = response.data.data.roles;
        }

      });
  },
  methods: {
    updateUser() {
      this.axios
        .post(
          `/api/user/change-role-user/${this.$route.params.id}`,
          this.userForm
        )
        .then((response) => {
          if (response.data.status === 200) {
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: `Change role ${this.userForm.name} Success`,
              showConfirmButton: false,
              timer: this.$config.notificationTimer ?? 1000,
            });
            // alert(response.data.message);
          }
        })
        .catch((error) => {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Error ${error.response.status}: ${error.response.data.message}`,
          });
          // alert(`Error ${error.response.status}: ${error.response.data.message}`);
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>