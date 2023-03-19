<template>
    <div>
        <h3 class="text-center">Edit Translate</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="updateTranslate">
                    <div class="form-group">
                        <label>Translate:</label>
                        <input type="text" placeholder="Enter new word" class="form-control"
                            v-model="translateForm.translate" required>
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
            translateForm: {},
            languages: []
        }
    },
    created() {
        this.axios
            .get(`/api/translate/edit/${this.$route.params.id}`)
            .then((response) => {
                this.translateForm = {
                    'translate': response.data.translate.translate,
                    'description': response.data.translate.description,
                    'original_language_description': response.data.translate.original_language_description,
                    'language_id': response.data.translate.language_id
                };
                this.languages = response.data.languages;
                console.log(response.data);
            });
    },
    methods: {
        updateTranslate() {
            this.axios
                .post(`/api/translate/update/${this.$route.params.id}`, this.translateForm)
                .then((response) => {
                    this.$router.push({ name: 'words' });
                });
        }
    }
}
</script>