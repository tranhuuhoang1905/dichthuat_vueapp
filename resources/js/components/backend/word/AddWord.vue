<template>
    <div>
        <h3 class="text-center">Add Word</h3>
        <div class="row">
            <div class="col-md-12">
                <form @submit.prevent="addWord">
                    <div class="row">
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Word:</label>
                                <input type="text" placeholder="Enter new word" class="form-control" v-model="word.word"
                                    required>
                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <input type="text" placeholder="Enter description" class="form-control"
                                    v-model="word.description" required>
                            </div>
                            <div class="form-group">
                                <label>Language</label>
                                <select class="form-select" aria-label="Default select example" v-model="word.language_id"
                                    required>
                                    <option v-for="(language, index) in languages" :key="language.id"
                                        :value="`${language.id}`">{{ language.name }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Translate</label>
                                <input type="text" placeholder="Enter translated word" class="form-control"
                                    v-model="word.translate" required>
                            </div>
                            <div class="form-group">
                                <label>Translate description</label>
                                <input type="text" placeholder="Enter description" class="form-control"
                                    v-model="word.translate_description" required>
                            </div>
                            <div class="form-group">
                                <label>Language translate id</label>
                                <select class="form-select" aria-label="Default select example"
                                    v-model="word.language_translate_id" required>
                                    <!-- <option :value="-1" selected>Open this select menu</option> -->
                                    <option v-for="(language, index) in languages" :key="language.id"
                                        :value="`${language.id}`">{{ language.name }} </option>
                                </select>
                                <!-- <input type="text" class="form-control" v-model="word.language_translate_id"> -->
                            </div>
                        </div>
                    </div>


                    <button type="submit" class="btn btn-primary">Add Word</button>
                </form>
            </div>
        </div>
    </div>
</template>
 
<script>
export default {
    data() {
        return {
            languages: [],
            word: {
            }
        }
    },
    created() {
        this.axios
            .post('/api/languages')
            .then((response) => {
                this.languages = response.data;
                if (response.data.length > 0) {
                    this.word.language_id = this.word.language_translate_id = response.data[0].id;
                }
            });
        console.log(this.languages);
    },
    methods: {
        addWord() {
            this.axios
                .post('/api/word/add', this.word)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: 'words' });

                })
                .catch(error => console.log(error))
                .finally(() => this.loading = false)
        }
    }
}
</script>