<template>
  <div class="edit_translate">
    <div class="row">
      <div class="row d-flex justify-content-center">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">Edit Translate</h4>
            <div class="col-md-12 d-flex flex-column align-items-center">
              <form @submit.prevent="updateTranslate">
                <div class="form-group">
                  <label>Translate:</label>
                  <input type="text" placeholder="Enter new word" class="form-control" v-model="translateForm.translate"
                    required />
                </div>
                <div class="form-group">
                  <label>Description</label>
                  <textarea placeholder="Enter description" class="form-control" v-model="translateForm.description"
                    rows="4" required></textarea>
                </div>

                <div class="form-group">
                  <label>Description in original language:</label>
                  <textarea placeholder="Enter description in original language" class="form-control"
                    v-model="translateForm.original_language_description" rows="4" required></textarea>
                </div>
                <div class="form-group">
                  <label>Language</label>
                  <select class="form-select" aria-label="Default select example" v-model="translateForm.language_id"
                    required>
                    <option v-for="language in languages" :key="language.id" :value="`${language.id}`">
                      {{ language.name }}
                    </option>
                  </select>
                </div>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-all-add-edit">
                    Update Word
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
      translateForm: {},
      languages: [],
    };
  },
  created() {
    this.axios
      .get(`/api/translate/edit/${this.$route.params.id}`)
      .then((response) => {
        if (response.data.status === 200) {
          this.translateForm = {
            translate: response.data.data.translate.translate,
            description: response.data.data.translate.description,
            original_language_description:
              response.data.data.translate.original_language_description,
            language_id: response.data.data.translate.language_id,
          };
          this.languages = response.data.data.languages;
          console.log(response.data);
        }

      });
  },
  methods: {
    updateTranslate() {
      this.axios
        .post(`/api/translate/update/${this.$route.params.id}`, this.translateForm)
        .then((response) => {
          if (response.data.status === 200) {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          alert(`Error ${error.response.status}: ${error.response.data.message}`);
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>