<template>
    <div>
        <h3 class="text-center">Add Language</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="addLanguage">
                    <div class="form-group">
                        <label>Language name</label>
                        <input type="text" class="form-control" v-model="language.name">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control" v-model="language.description">
                    </div>
                    <button type="submit" class="btn btn-primary">Add Language</button>
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
    methods: {
        addLanguage() {
            this.axios
                .post('/api/language/add', this.language)
                .then(response => (
                    this.$router.push({ name: 'languages' })
                    // console.log(response.data)
                ))
                .catch(error => console.log(error))
                .finally(() => this.loading = false)
        }
    }
}
</script>