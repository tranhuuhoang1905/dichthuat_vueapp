<template>
  <div class="log_import">
    <div class="row">
      <div class="col-12">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4 mb-3">Log Import</h4>
            <div class="">
              <table ref="myTable" class="table table-bordered table-striped table-hover display nowrap">

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
      roles: [],
      dataTableData: []
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
        { data: "id", title: "ID" },
        { data: "file_name", title: "File Name" },
        { data: "language_name", title: "Language" },
        { data: "language_translate_name", title: "Language Translate" },
        {
          data: "created_at",
          title: "Created At",
          render: function (data, type, row) {
            const date = new Date(data);
            return date.toLocaleDateString();
          },
        },
        {
          data: "updated_at",
          title: "Updated At",
          render: function (data, type, row) {
            const date = new Date(data);
            return date.toLocaleDateString();
          },
        },
        {
          data: "id",
          title: "Backup",
          createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
            // const self = this;
            // const table = $(self.$refs.myTable);
            // console.log(table);
            let isRollbacked = rowData.status === 0;
            const app = createApp({
              render() {
                return h('a', {
                  to: `/admin/log-import/rollback/${rowData.id}`,
                  class: 'btn btn-all-add-edit',
                  onClick: () => {
                    if (rowData.status === 1) {
                      self.rollback(rowData.id)
                    }

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
              }
            })
            app.mount(cell);
          }
        }
      ];
    },
    rollback(id) {
      this.axios.post(`/api/log-import/rollback/${id}`)
        .then((response) => {
          if (response.data.success == true) {

            this.updateRollbackedRowData(id);
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: `RollBack Success`,
              showConfirmButton: false,
              timer: this.$config.notificationTimer ?? 1000,
            });
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
    updateRollbackedRowData(id) {
      let elementToUpdate = this.dataTableData.find((item) => item.id === id);
      if (elementToUpdate) {
        elementToUpdate.status = 0;
      }

      $(this.$refs.myTable).DataTable().destroy();
      this.table = $(this.$refs.myTable).DataTable({
        data: this.dataTableData,
        columns: this.columns,
        scrollX: true,
      });
    },
    fetchData() {
      this.axios.get("/api/log-import")
        .then((response) => {
          if (response.data.message === 'success') {
            this.dataTableData = response.data.data.log_import;
            this.table = $(this.$refs.myTable).DataTable({
              data: this.dataTableData,
              columns: this.columns,
              scrollX: true,
            })
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
    }
  },
  computed: {

  }
};
</script>
