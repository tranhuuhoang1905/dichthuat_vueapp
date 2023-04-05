<template>
  <div class="log_import">
    <div class="row">
      <div class="col-12">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4 mb-3">Log Import</h4>
            <div class="">
              <table ref="myTable" class="table table-bordered table-striped table-hover display nowrap">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>File Name</th>
                    <th>Language</th>
                    <th>Language Translate</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Backup</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="log in Logs" :key="log.id">
                    <td>{{ log.id }}</td>
                    <td>{{ log.file_name }}</td>
                    <td>{{ log.language_id }}</td>
                    <td>{{ log.language_translate_id }}</td>
                    <td>{{ log.status }}</td>
                    <td>{{ log.created_at }}</td>
                    <td>{{ log.updated_at }}</td>

                    <td>
                      <div class="btn-group" role="group">
                        <router-link :to="{
                          name: 'Back up',
                          params: { id: log.id },
                        }" class="btn btn-all-add-edit rounded-3 mx-3"><i class="fas fa-edit"></i></router-link>
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

    setColumns() {
      const self = this;
      this.columns = [
        { data: "id" },
        { data: "file_name" },
        { data: "language_id" },
        { data: "language_translate_id" },
        {
          data: "status",
          render: function (data, type, row) {

            const checked = row.status == 0 ? "checked" : "";
            return `<input type="checkbox" id="${row.status}" ${checked}/><label for="${row.status}">Toggle</label>`
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
        {
          data: "id",
          createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
            // const table = $(self.$refs.myTable);
            let isRollbacked = rowData.status === 0;
            const app = createApp({
              render() {
                return h('a', {
                  to: `/admin/log-import/rollback/${rowData.id}`,
                  class: 'btn btn-all-add-edit',
                  onClick: () => {
                    if (rowData.status === 0) {
                      rowData.status = 1;
                    } else {
                      rowData.status = 0;
                    }
                    this.rollback(rowData.id)
                    // console.log("check rowData.status", rowData.status)
                    // table.draw();
                  }
                }, isRollbacked ? 'rollbacked' : 'rollback')
              },
              data() {
                return {
                  rowData: rowData,
                  axios: axios,
                  // table: table
                }
              },
              methods: {
                rollback(id) {
                  console.log(id);
                  this.axios
                    .post(`/api/log-import/rollback/${id}`, {
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                      },
                    })
                    .then((response) => {
                      if (response.data.success == true) {
                        //chưa tìm ra hàm reload table nên xài tạm reload page
                        location.reload()
                      }
                    });
                }
              }
            })
            app.mount(cell);
          }
        }
      ];



    },
    fetchData() {
      this.axios.get("/api/log-import").then((response) => {
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

  }
};
</script>
