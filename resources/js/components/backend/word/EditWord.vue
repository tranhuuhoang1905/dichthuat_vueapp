<template>
    <div>
        <h3 class="text-center">Edit Word</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="updateWord">
                    <div class="form-group">
                        <label>Word name</label>
                        <input type="text" class="form-control" v-model="word.name">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control" v-model="word.description">
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
            word: {}
        }
    },
    created() {
        this.axios
            .get(`/api/word/edit/${this.$route.params.id}`)
            .then((response) => {
                this.word = response.data;
                // console.log(response.data);
            });
    },
    methods: {
        updateWord() {
            this.axios
                .post(`/api/word/update/${this.$route.params.id}`, this.word)
                .then((response) => {
                    this.$router.push({ name: 'words' });
                });
        }
    }
}
</script>