<template>
    <div>
        <h3 class="text-center">Edit Language</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="updateLanguage">
                    <div class="form-group">
                        <label>Language name</label>
                        <input type="text" class="form-control" v-model="language.name">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control" v-model="language.description">
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
            .get(`http://localhost:8000/api/language/edit/${this.$route.params.id}`)
            .then((response) => {
                this.language = response.data;
                // console.log(response.data);
            });
    },
    methods: {
        updateLanguage() {
            this.axios
                .post(`http://localhost:8000/api/language/update/${this.$route.params.id}`, this.language)
                .then((response) => {
                    this.$router.push({ name: 'languages' });
                });
        }
    }
}
</script>