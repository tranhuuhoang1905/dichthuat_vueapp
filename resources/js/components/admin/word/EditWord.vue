<template>
    <div>
        <h3 class="text-center">Edit Word</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="updateWord">
                    <div class="form-group">
                        <label>Word:</label>
                        <input type="text" placeholder="Enter new word" class="form-control" v-model="wordForm.word"
                            required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" placeholder="Enter description" class="form-control"
                            v-model="wordForm.description" required>
                    </div>
                    <div class="form-group">
                        <label>Language</label>
                        <select class="form-select" aria-label="Default select example" v-model="wordForm.language_id"
                            required>
                            <option v-for="(language, index) in languages" :key="language.id" :value="`${language.id}`">{{
                                language.name }}</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Update Word</button>
                </form>
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