<template>
  <div class="all_languages">
    <div class="row">
      <div class="col-12">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4 mb-3">All Languages</h4>
            <div class="">
              <table ref="myTable" class="table table-bordered table-striped table-hover display nowrap">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th v-if="userHasAdmin">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="language in languages" :key="language.id">
                    <td>{{ language.id }}</td>
                    <td>{{ language.name }}</td>
                    <td>{{ language.description }}</td>
                    <td>{{ language.status }}</td>
                    <td>{{ language.created_at }}</td>
                    <td>{{ language.updated_at }}</td>

                    <td v-if="userHasAdmin">
                      <div class="btn-group" role="group">
                        <router-link :to="{
                          name: 'edit-language',
                          params: { id: language.id },
                        }" class="btn btn-all-add-edit rounded-3 mx-3"><i class="fas fa-edit"></i></router-link>
                        <button class="btn btn-danger rounded-3" @click="deleteLanguage(language.id)">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
DataTable.use(DataTablesCore);
import checkAccess from '@resources/js/middleware/access.js';
import { createApp, h } from 'vue';
import router from '@resources/js/router/index'; // import router từ file router.js
export default {
  data() {
    return {
      languages: [],
      roles: []
    };
  },
  created() {
    this.setColumns();
    this.fetchData();
  },
  methods: {
    deleteLanguage(id) {
      this.axios
        .delete(`/api/language/delete/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          let i = this.languages.findIndex((language) => language.id === id);
          this.languages.splice(i, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    actionEditStatus(rowData) {
      let dataReponsive = {};
      dataReponsive.status = rowData.status == 1 ? 0 : 1;
      this.axios
        .post(`/api/language/update/${rowData.id}`, dataReponsive)
        .then((response) => {
          if (response.data.status === 200) {
            this.$swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Update language ${rowData.name} success`,
              showConfirmButton: false,
              timer: this.$config.notificationTimer ?? 1000
            })
          }
        })
        .catch((error) => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error ${error.response.status}: ${error.response.data.message}`,
          })
        });
    },
    setColumns() {
      const self = this;
      this.columns = [
        { data: "id" },
        { data: "name" },
        { data: "description" },
        {
          data: "status",
          render: function (data, type, row) {
            console.log("check row.status", row);
            const checked = row.status == 0 ? "checked" : "";
            return `<input type="checkbox" id="${row.id}" ${checked}/><label for="${row.id}">Toggle</label>`
          },
          createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
            console.log("check rowData", rowData);
            const checkbox = cell.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('click', function () {
              self.actionEditStatus(rowData);
            }.bind(this));
          },

        },
        {
          data: "created_at",
          render: function (data, type, row) {
            const date = new Date(data);
            return date.toLocaleDateString();
          },
        },
        {
          data: "updated_at",
          render: function (data, type, row) {
            const date = new Date(data);
            return date.toLocaleDateString();
          },
        },
      ];

      if (this.userHasAdmin) {
        this.columns.push({
          data: "id",
          createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
            const app = createApp({
              render() {
                return h('a', {
                  to: `/admin/language/edit/${rowData.id}`,
                  class: 'btn btn-all-add-edit',
                  onClick: () => {
                    router.push({ name: 'Edit Language', params: { id: rowData.id } });
                  }
                }, 'edit')
              },
              data() {
                return {
                  rowData: rowData
                }
              }
            })
            app.mount(cell);
          }
        });
      }

    },
    fetchData() {
      this.axios.get("/api/language/all-language").then((response) => {
        if (response.data.message === 'success') {
          this.table = $(this.$refs.myTable).DataTable({
            data: response.data.data,
            columns: this.columns,
            scrollX: true,
          });
        }
      });
    }
  },
  computed: {
    userHasAdmin() {
      return checkAccess(['admin']);
    }
  }
};
</script>
