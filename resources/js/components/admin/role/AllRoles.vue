<template>
  <div class="all_roles">
    <div class="row">
      <div class="col-12">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4 mb-3">All Roles</h4>
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
      roles: [],
      DataTableData: [],
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
        { data: "name", title: "Role" },
        { data: "description", title: "Description" },
        {
          data: "id", title: "Permissions",
          createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
            const app = createApp({
              render() {
                return h('ul', { class: 'ul-permission' }, rowData.permissions.map(permission => {
                  return h('li', {}, [
                    h('a', {
                      to: `/admin/role/edit/${rowData.id}`,
                      class: 'btn btn-all-add-edit',
                      onClick: () => {
                        self.updateRowData(rowData.id);
                        // router.push({ name: 'Edit Role', params: { id: rowData.id } });
                      }
                    }, permission.name)
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
          createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
            const app = createApp({
              render() {
                return h('a', {
                  to: `/admin/role/edit/${rowData.id}`,
                  class: 'btn btn-all-add-edit',
                  onClick: () => {
                    // router.push({ name: 'Edit Role', params: { id: rowData.id } });
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
      this.axios.get("/api/role/all").then((response) => {
        if (response.data.success === true && response.data.status == 200) {
          console.log("check response.data", response.data);
          this.setColumns();
          this.DataTableData = response.data.data.roles
          this.table = $(this.$refs.myTable).DataTable({
            data: this.DataTableData,
            columns: this.columns,
            scrollX: true,
          });
        }
      });
    },
    updateRowData(id) {
      console.log("check DataTableData", this.DataTableData);
      let elementToUpdate = this.DataTableData.find(item => item.id === id);
      if (elementToUpdate) {
        elementToUpdate.name = 'new_name'; // Thay đổi giá trị của biến "name" thành giá trị mới
      };
      console.log("check DataTableData 2", this.DataTableData);
      $(this.$refs.myTable).DataTable().destroy();
      this.table = $(this.$refs.myTable).DataTable({
        data: this.DataTableData,
        columns: this.columns,
        scrollX: true,
      });
      // this.DataTableData

    }
  },
  computed: {
  }
};
</script>
