<template>
  <div class="add-edit-language">
    <div class="row">
      <div class="row d-flex justify-content-center">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">Edit Language</h4>
            <div class="col-md-12 d-flex flex-column align-items-center">
              <form @submit.prevent="updateLanguage">
                <div class="form-group">
                  <label for="language-name">Language name</label>
                  <input
                    id="language-name"
                    type="text"
                    class="form-control"
                    v-model="language.name"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="language-description">Description</label>
                  <textarea
                    id="language-description"
                    rows="7"
                    type="text"
                    class="form-control"
                    v-model="language.description"
                    required
                  ></textarea>
                </div>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-add-edit">
                    Update Language
                  </button>
                </div>
              </form>
            </div>
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
      language: {},
    };
  },
  created() {
    this.axios
      .get(`/api/language/edit/${this.$route.params.id}`)
      .then((response) => {
        this.language = response.data;
      });
  },
  methods: {
    updateLanguage() {
      this.axios
        .post(`/api/language/update/${this.$route.params.id}`, this.language)
        .then(() => {
          this.$router.push({ name: "languages" });
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to update language");
        });
    },
  },
};
</script>
<style scoped>
.edit-language {
  margin: 20px;
}
</style>