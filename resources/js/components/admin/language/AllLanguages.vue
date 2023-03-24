<template>
  <div class="all_languages_word">
    <div class="row">
      <div class="col-12">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">All Languages</h4>
              <table id="datatable"
              class="table table-bordered dt-responsive nowrap">
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
                        <router-link
                          :to="{
                            name: 'edit-language',
                            params: { id: language.id },
                          }"
                          class="btn btn-all-add-edit rounded-3 mx-3"
                          ><i class="fas fa-edit"></i></router-link
                        >
                        <button
                          class="btn btn-danger rounded-3"
                          @click="deleteLanguage(language.id)"
                        >
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
export default {
  data() {
    return {
      languages: [],
      roles: [],
    };
  },
  created() {
    this.axios
      .get("/api/languages")
      .then((response) => {
        this.languages = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
  },
};
</script>
