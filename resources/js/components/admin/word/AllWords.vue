<template>
  <div class="all_word">
    <div class="row">
      <div class="col-12">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">All Words</h4>
            <div class="">
              <table ref="myTable" class="table table-bordered table-striped table-hover display nowrap">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="word in words" :key="word.id">
                    <td>{{ word.id }}</td>
                    <td>{{ word.word }}</td>
                    <td>{{ word.description }}</td>
                    <td>{{ word.status }}</td>
                    <td>{{ word.created_at }}</td>
                    <td>{{ word.updated_at }}</td>
                    <td>
                      <div class="btn-group" role="group">
                        <router-link :to="{
                          name: 'Word Default',
                          params: { id: word.id },
                        }" class="btn btn-all-add-edit">Default
                        </router-link>
                        <!-- <router-link :to="{ name: 'Edit Word', params: { id: word.id } }" class="btn btn-primary">Edit
                            </router-link> -->
                        <!-- <button class="btn btn-danger" @click="deleteWord(word.id)">Delete</button> -->
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
import { createApp, h } from "vue";
import router from '@resources/js/router/index';
DataTable.use(DataTablesCore);
export default {
  data() {
    return {
      words: [],
    };
  },
  mounted() { },
  created() {
    this.setColumns()
    this.fetchData();
  },
  methods: {
    deleteWord(id) {
      this.axios
        .delete(`/api/word/delete/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          let i = this.words.map((item) => item.id).indexOf(id); // find index of your object
          this.words.splice(i, 1);
        });
    },
    fetchData() {
      this.axios.post("/api/word/all-word").then((response) => {
        // this.words = response.data;
        if (response.data.status === 200) {
          const isSmallScreen = window.innerWidth < 760;
          const pagingType = isSmallScreen ? "simple" : "simple_numbers";
          this.table = $(this.$refs.myTable).DataTable({
            responsive: true,
            data: response.data.data.words,
            columns: this.columns,
            // lengthMenu: [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]], // set number of records per page
            pagingType: pagingType, // display only a few page buttons
            scrollX: true,
          });
        }
      });
    },
    actionEditStatus(rowData) {
      let dataReponsive = {};
      dataReponsive.status = rowData.status == 1 ? 0 : 1;
      this.axios
        .post(`/api/word/update/${rowData.id}`, dataReponsive)
        .then((response) => {
          if (response.data.status === 200) {
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: `Update Word ${rowData.word} Success`,
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
        })
        .finally(() => (this.loading = false));
    },
    setColumns() {
      const self = this;
      this.columns = [
        { data: "id" },
        { data: "word" },
        { data: "description" },
        {
          data: "status",
          render: function (data, type, row) {
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
        {
          data: "id",
          createdCell: function (
            cell,
            cellData,
            rowData,
            rowIndex,
            colIndex
          ) {
            const app = createApp({
              render() {
                return h(
                  "a",
                  {
                    to: `/admin/word/default/${rowData.id}`,
                    class: "btn btn-all-add-edit",
                    onClick: () => {
                      router.push({
                        name: "Word Default",
                        params: { id: rowData.id },
                      });
                    },
                  },
                  "Default"
                );
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
  },
};
</script>