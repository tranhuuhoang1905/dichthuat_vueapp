<template>
  <div class="create_user">
    <div class="row d-flex justify-content-center">
      <div class="col-md-7">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">Create New User</h4>
            <div class="col-md-12">
              <form @submit.prevent="createNewUser">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Email</label>
                      <input type="email" placeholder="Enter description" class="form-control" v-model="newUser.email"
                        required />
                    </div>
                    <div class="form-group">
                      <label>Username</label>
                      <input type="text" placeholder="Enter description" class="form-control" v-model="newUser.name"
                        required />
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input type="password" placeholder="Enter password" class="form-control" v-model="newUser.password"
                        required />
                    </div>
                    <div class="form-group">
                      <label>Role</label>
                      <select class="form-select" aria-label="Default select example" v-model="newUser.role" required>
                        <option v-for="role in roles" :key="role.id" :value="`${role.id}`">
                          {{ role.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-all-add-edit py-2 px-5">
                    Add User
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
      roles: [],
      newUser: {
        // đối tượng người dùng mới
        password: "",
        email: "",
        role: "",
        name: "",
      },
    };
  },

  created() {
    this.axios.get("/api/user/roles").then((response) => {
      this.roles = response.data;
      console.log(response.data);
    });
  },
  methods: {
    createNewUser() {
      console.log(this.newUser);
      this.axios
        .post("/api/user/create-new-user", this.newUser)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "User Manager" });
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  },
};
</script>