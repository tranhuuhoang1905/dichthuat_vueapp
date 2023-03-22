<template>
    <div>
        <h3 class="text-center">Import Word From Excel</h3>
        <form @submit.prevent="importWordsFromExcel">
            <div class="form-group">
                <label>Language</label>
                <select class="form-select" aria-label="Default select example" v-model="WordsFromExcel.language_id"
                    required>
                    <option v-for="(language, index) in languages" :key="language.id" :value="`${language.id}`">{{
                        language.name }}</option>
                </select>
            </div>
            <div class="form-group">
                <label>Language translate id</label>
                <select class="form-select" aria-label="Default select example"
                    v-model="WordsFromExcel.language_translate_id" required>
                    <!-- <option :value="-1" selected>Open this select menu</option> -->
                    <option v-for="(language, index) in languages" :key="language.id" :value="`${language.id}`">{{
                        language.name }} </option>
                </select>
                <!-- <input type="text" class="form-control" v-model="word.language_translate_id"> -->
            </div>
            <input type="file" ref="fileInput">
            <button type="submit">Upload</button>
        </form>
    </div>
</template>
 
<script>
export default {
    data() {
        return {
            languages: [],
            word: {
            },
            WordsFromExcel: {}
        }
    },
    created() {
        this.axios
            .get('/api/languages')
            .then((response) => {
                this.languages = response.data;
                if (response.data.length > 0) {
                    this.word.language_id = this.word.language_translate_id = response.data[0].id;
                }
            });
        console.log(this.languages);
    },
    methods: {
        importWordsFromExcel() {
            const fileInput = this.$refs.fileInput;
            const file = fileInput.files[0];

            const formData = new FormData();
            formData.append('file', file);
            formData.append('language_id', this.WordsFromExcel.language_id);
            formData.append('language_translate_id', this.WordsFromExcel.language_translate_id);

            axios.post('/api/word/save-words-from-excel', formData, {
                responseType: 'blob'
            })
                .then(response => {
                    this.$router.push({ name: 'words' });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>