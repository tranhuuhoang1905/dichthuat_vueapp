<template>
  <div class="change_role_user">
    <div class="row">
      <div class="row d-flex justify-content-center">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">Change role user</h4>
            <div class="col-md-12 d-flex flex-column align-items-center">
              <form @submit.prevent="updateUser">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="Enter description"
                        class="form-control"
                        v-model="userForm.email"
                        disabled
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label>Username</label>
                      <input
                        type="text"
                        placeholder="Enter description"
                        class="form-control"
                        v-model="userForm.name"
                        required
                        disabled
                      />
                    </div>
                    <div class="form-group">
                      <label>Role</label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        v-model="userForm.role"
                        required
                      >
                        <option
                          v-for="role in roles"
                          :key="role.id"
                          :value="`${role.id}`"
                        >
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
    // this.axios
    //     .get('/api/user/roles')
    //     .then((response) => {
    //         this.roles = response.data;
    //         console.log(response.data);
    //     });
    this.axios
      .get(`/api/user/edit/${this.$route.params.id}`)
      .then((response) => {
        this.userForm = {
          name: response.data.user.name,
          email: response.data.user.email,
          // xử lý lại nếu role không tồn tại thì trả về null
          role: response.data.user.roles[0].id,
        };
        this.roles = response.data.roles;
      });
  },
  methods: {
    updateUser() {
      console.log(this.user);
      this.axios
        .post(
          `/api/user/change-role-user/${this.$route.params.id}`,
          this.userForm
        )
        .then((response) => {
          this.$router.push({ name: "user-manager" });
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  },
};
</script>