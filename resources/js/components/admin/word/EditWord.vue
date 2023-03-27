<template>
    <div class="edit_word">
        <div class="row">
      <div class="row d-flex justify-content-center">
        <div class="card show border border-0">
        <div class="card-body">
          <h4 class="card-title text-center fs-4">Edit Word</h4>
          <div class="col-md-12">
                <form @submit.prevent="updateWord">
                    <div class="form-group">
                        <label>Word:</label>
                        <input type="text" placeholder="Enter new word" class="form-control" v-model="wordForm.word"
                            required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea type="text" placeholder="Enter description" class="form-control"
                            v-model="wordForm.description" rows="7" cols="70" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Language</label>
                        <select class="form-select" aria-label="Default select example" v-model="wordForm.language_id"
                            required>
                            <option v-for="(language) in languages" :key="language.id" :value="`${language.id}`">{{
                                language.name }}</option>
                        </select>
                    </div>
                    <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-all-add-edit">Update Word</button>
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
            wordForm: {},
            languages: []
        }
    },
    created() {
        this.axios
            .get(`/api/word/edit/${this.$route.params.id}`)
            .then((response) => {
                this.wordForm = { 'word': response.data.word.word, 'description': response.data.word.description, 'language_id': response.data.word.language_id };
                this.languages = response.data.languages;
                // console.log(response.data);
            });
    },
    methods: {
        updateWord() {
            this.axios
                .post(`/api/word/update/${this.$route.params.id}`, this.wordForm)
                .then((response) => {
                    this.$router.push({ name: 'words' });
                });
        }
    }
}
</script>