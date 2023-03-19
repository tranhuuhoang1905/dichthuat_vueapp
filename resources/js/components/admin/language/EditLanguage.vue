<template>
    <div>
        <h3 class="text-center">Edit Language</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="updateLanguage">
                    <div class="form-group">
                        <label for="language-name">Language name</label>
                        <input id="language-name" type="text" class="form-control" v-model="language.name" required>
                    </div>
                    <div class="form-group">
                        <label for="language-description">Description</label>
                        <input id="language-description" type="text" class="form-control" v-model="language.description"
                            required>
                    </div>
                    <button type="submit" class="btn btn-primary">Update Language</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            language: {}
        }
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
                    this.$router.push({ name: 'languages' });
                })
                .catch((error) => {
                    console.log(error);
                    alert('Failed to update language');
                });
        }
    }
}
</script>
<style scoped>
.edit-language {
    margin: 20px;
}
</style>