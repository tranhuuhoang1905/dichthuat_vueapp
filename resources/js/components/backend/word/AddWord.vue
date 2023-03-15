<template>
    <div>
        <h3 class="text-center">Add Word</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="addWord">
                    <div class="form-group">
                        <label>Word name</label>
                        <input type="text" class="form-control" v-model="word.word">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control" v-model="word.description">
                    </div>
                    <div class="form-group">
                        <label>Language Id</label>
                        <input type="text" class="form-control" v-model="word.language_id">
                    </div>
                    <div class="form-group">
                        <label>translate</label>
                        <input type="text" class="form-control" v-model="word.translate">
                    </div>
                    <div class="form-group">
                        <label>translate description</label>
                        <input type="text" class="form-control" v-model="word.translate_description">
                    </div>
                    <div class="form-group">
                        <label>Language translate id</label>
                        <input type="text" class="form-control" v-model="word.language_translate_id">
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
            word: {}
        }
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