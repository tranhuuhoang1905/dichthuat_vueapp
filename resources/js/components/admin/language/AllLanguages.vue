<template>
  <div class="all_languages">
    <div class="row">
      <div class="col-12">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">All Languages</h4>
            <table ref="myTable" class="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Actions</th>
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

                  <td>
                    <div class="btn-group" role="group">
                      <router-link :to="{
                        name: 'Edit Language',
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
</template>

<script>
import { exit } from "process";
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import $ from 'jquery';
DataTable.use(DataTablesCore);
export default {
  data() {
    return {
      languages: [],
      roles: [],
    };
  },
  created() {
    this.fetchData();
    // this.axios
    //   .get("/api/languages")
    //   .then((response) => {
    //     this.languages = response.data;
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
    fetchData() {
      this.axios.get("/api/languages").then((response) => {
        // this.words = response.data;
        this.table = $(this.$refs.myTable).DataTable({
          data: response.data,
          columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'description' },
            { data: 'state' },
            { data: 'created_at' },
            { data: 'updated_at' },
            {
              data: 'id',
              render: function (data, type, row) {
                return '<div class="btn-group" role="group">' +
                  '<a class="btn btn-all-add-edit" href="/admin/language/edit/' + row.id + '">edit</a>' +
                  '</div>';
              }
            }
          ]
        });
      });
    },
  },
};
</script>
