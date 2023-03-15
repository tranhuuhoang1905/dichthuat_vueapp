<template>
    <div>
        <h3 class="text-center">Edit Word</h3>
        <div class="row">
            <div class="col-md-6">
                <div>
                    <span>id: {{ word.word }}</span><br />
                </div>
                <div v-for="translate in translates" :key="translate.id">
                    <span>id: {{ translate.id }}</span><br />
                    <span>language: {{ translate.language }}</span><br />
                    <span>translate: {{ translate.translate }}</span><br />
                    <span>description: {{ translate.description }}</span><br />
                </div>
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
            .get(`/api/word/default/${this.$route.params.id}`)
            .then((response) => {
                this.word = response.data.word_info;
                this.translates = response.data.translates;
                // console.log(response.data);
            });
    },
    methods: {

    }
}
</script>