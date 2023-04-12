<template>
  <div class="all_permissions">
    <div class="row">
      <div class="col-12">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4 mb-3">All Permissions</h4>
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
import checkAccess from '@resources/js/middleware/access.js';
import { createApp, h } from 'vue';
import router from '@resources/js/router/index'; // import router từ file router.js
export default {
  data() {
    return {
      permissions: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    setColumns() {
      const self = this;
      this.columns = [
        { data: "id", title: "ID" },
        { data: "name", title: "Permission" },
        { data: "description", title: "Description" },
        {
          data: "id", title: "Action",
          createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
            const app = createApp({
              render() {
                return h('a', {
                  to: `/admin/permission/edit/${rowData.id}`,
                  class: 'btn btn-all-add-edit',
                  onClick: () => {
                    // router.push({ name: 'Edit Permission', params: { id: rowData.id } });
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
        }
      ];
    },
    fetchData() {
      this.axios.get("/api/permission/all").then((response) => {
        if (response.data.success === true && response.data.status == 200) {
          console.log("check response.data", response.data);
          this.setColumns();
          this.table = $(this.$refs.myTable).DataTable({
            data: response.data.data.permissions,
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
