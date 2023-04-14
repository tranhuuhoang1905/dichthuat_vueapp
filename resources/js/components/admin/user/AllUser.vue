<template>
  <div class="user_manager">
    <div class="row position-relative">
      <div class="col-md-12">
        <div class="card show border border-0">
          <router-link :to="{ name: 'Create New User' }" class="btn btn-all-add-edit my-3 mx-3 position-absolute">Add
            user</router-link>
          <div class="card-body">
            <h4 class="card-title text-md-center fs-4 my-3 text-right">
              User Manager
            </h4>
            <div class="table-responsive-lg">
              <table ref="myTable" class="table table-bordered table-striped table-hover display nowrap">

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <button ref="myModalBtn" type="button" class="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog row p-5" role="document">
        <div class="modal-content col-md-12">
          <div class="row">
            <div class="word_default p-4">
              <h3 class="text-center">Word Default</h3>
              <div class="row ">
                <div class="col-md-12 d-flex flex-column align-items-center">
                  <form @submit.prevent="updateUser">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Email</label>
                          <input type="email" placeholder="Enter description" class="form-control"
                            v-model="userForm.email" disabled required />
                        </div>
                        <div class="form-group">
                          <label>Username</label>
                          <input type="text" placeholder="Enter description" class="form-control" v-model="userForm.name"
                            required disabled />
                        </div>
                        <div class="form-check" v-for="(role, index) in roles" :key="index">
                          <label class="form-check-label">
                            <input type="checkbox" class="form-check-input" value=""
                              :checked="isRolesChecked(userRoles, role.id)"
                              @click="handleCheckboxClick(role.id, $event.target.checked)">{{
                                role.name }}
                          </label>
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
    </div>
  </div>
</template>
  
<script>
import { exit } from "process";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import $ from "jquery";
import { createApp, h } from "vue";
import router from '@resources/js/router/index';
DataTable.use(DataTablesCore);
import { saveAs } from "file-saver";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      users: [],
      showUserForm: false, // biến đánh dấu hiển thị form thêm mới người dùng
      newUser: {
        // đối tượng người dùng mới
        name: "",
        email: "",
        role: "",
      },
      userForm: [],
      userRoles: [],
      roles: [],
      DataTableData: []
    };
  },

  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions(["logout"]),
    // thêm mới người dùng
    addUser() {
      // thực hiện các xử lý để thêm mới người dùng vào danh sách
      // sau khi thêm mới xong, reset trạng thái của biến newUser và đóng form
      this.newUser = {
        name: "",
        email: "",
        role: "",
      };
      this.showUserForm = false;
    },
    updateUser() {
      console.log("check userForm:", this.userForm);
      this.axios
        .post(
          `/api/user/change-role-user/${this.userForm.id}`,
          this.userForm
        )
        .then((response) => {
          if (response.data.status === 200) {
            this.updateRowData(this.userForm.id, response.data.data.user_update);
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
    setColumns() {
      const self = this;
      this.columns = [
        { data: "id", title: "ID" },
        { data: "name", title: "Name" },
        { data: "email", title: "Email" },

        {
          data: "id", title: "Roles",
          class: "columns-list",
          createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
            const app = createApp({
              render() {
                return h('ul', { class: 'ul-list' }, rowData.roles.map(role => {
                  return h('li', {}, [
                    h('p', {
                      class: 'btn btn-all-add-edit',
                    }, role.name)
                  ]);
                }));
              },
              data() {
                return {
                  rowData: rowData
                }
              }
            })
            app.mount(cell);
          }
        },
        {
          data: "id", title: "Action",
          createdCell: function (
            cell,
            cellData,
            rowData,
            rowIndex,
            colIndex
          ) {
            const app = createApp({
              render() {
                return [
                  h(
                    "a",
                    {
                      to: `/admin/user-manager/change-role-user/${rowData.id}`,
                      class: "btn btn-all-add-edit",
                      onClick: () => {
                        // router.push({
                        //   name: "Change Role User",
                        //   params: { id: rowData.id },
                        // });
                        self.userForm = { name: rowData.name, email: rowData.email, id: rowData.id };
                        self.userRoles = rowData.roles;
                        self.$refs.myModalBtn.click();
                      },
                    },
                    "Change Role"
                  ),
                  h(
                    "a",
                    {
                      to: `/admin/user-manager/change-pasword-user/${rowData.id}`,
                      class: "btn btn-all-add-edit",
                      onClick: () => {
                        router.push({
                          name: "Change Password User",
                          params: { id: rowData.id },
                        });
                      },
                    },
                    "Change Password"
                  ),
                ];
              },
              data() {
                return {
                  rowData: rowData,
                };
              },
            });
            app.mount(cell);
          },
        },
      ];
    },
    fetchData() {
      this.axios.get("/api/user/allusers")
        .then((response) => {
          if (response.data.message === "success" && response.data.status == 200) {


            this.DataTableData = response.data.data.users;
            this.roles = response.data.data.roles;
            this.setColumns();
            this.table = $(this.$refs.myTable).DataTable({
              data: this.DataTableData,
              columns: this.columns,
              scrollX: true,
            });
          }
        })
        .catch((error) => {
          if (error.response.status == 403) {
            this.logout();
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: `Error ${error.response.status}: ${error.response.data.message}`,
            });
          }

          // alert(`Error ${error.response.status}: ${error.response.data.message}`);
        });
    },
    isRolesChecked(roles, roleId) {
      // return true;
      this.userForm['role_' + roleId] = false;
      if (Array.isArray(roles)) {
        const isCheck = roles.some(role => role.id === roleId)
        if (isCheck) {
          this.userForm['role_' + roleId] = true;
        }
        return isCheck;
      } else {
        return false;
      }
      // return true;

    },
    handleCheckboxClick(roleId, checked) {
      this.userForm['role_' + roleId] = checked;
    },
    updateRowData(id, newUser) {
      let elementToUpdate = this.DataTableData.find(item => item.id === id);
      if (elementToUpdate) {
        elementToUpdate.roles = newUser.roles;
      };

      $(this.$refs.myTable).DataTable().destroy();
      this.table = $(this.$refs.myTable).DataTable({
        data: this.DataTableData,
        columns: this.columns,
        scrollX: true,
      });
    }
  },
};
</script>