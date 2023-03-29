<template>
  <div class="all_word">
    <div class="row">
      <div class="col-12">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">All Words</h4>
            <div class="table-responsive-lg">
              <table ref="myTable" class="table table-bordered table-striped table-hover">
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
                        <router-link :to="{ name: 'Word Default', params: { id: word.id } }"
                          class="btn btn-all-add-edit">Default
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
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import $ from 'jquery';

DataTable.use(DataTablesCore);
export default {
  data() {
    return {
      words: [],
    };
  },
  mounted() {
    this.message = this.$route.params.get_message;
    console.log(this.$route);
    console.log(this.message);
  },
  created() {
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
      this.axios.post("/api/words").then((response) => {
        // this.words = response.data;
        if (response.data.status === 200) {
          this.table = $(this.$refs.myTable).DataTable({
            responsive: true,
            data: response.data.data.words,
            columns: [
              { data: 'id' },
              { data: 'word' },
              { data: 'description' },
              { data: 'status' },
              { data: 'created_at' },
              { data: 'updated_at' },
              {
                data: 'id',
                render: function (data, type, row) {
                  return '<div class="btn-group" role="group">' +
                    '<a class="btn btn-all-add-edit" href="/admin/word/default/' + row.id + '">Default</a>' +
                    '</div>';
                }
              }
            ]
          });
        }
      });
    },
  }
};
</script>