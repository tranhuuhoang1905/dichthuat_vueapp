<template>
    <div class="word_default">
        <h3 class="text-center">Word Default</h3>
        <div class="row">
            <div class="col-md-4">
                <h4>Word</h4>
                <div class=" word-default-data shadow-lg border border-0">
                    <div class="word-content">
                        <div class="box_mean">
                            <div class="title">
                                <p>{{ word.word }}</p>
                            </div>
                            <p class="box_mean-language">Language: {{ word.language }}</p>
                            <div class="box_mean_router">
                                <router-link :to="{ name: 'Edit Word', params: { id: wordId } }"
                                    class="btn btn-all-add-edit word-botton"><i class="fas fa-edit"></i> Edit
                                </router-link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <h4>Translate</h4>
                <div class="shadow-lg border border-0 word-default-data">
                    <div class="word-content" v-for="(translate, index) in translates " :key="index">
                        <hr v-if="index > 0">
                        <div class="icon_dot">{{ index + 1 }}) &nbsp;<span class="box_mean-language">Language: {{
                            translate.language }}</span></div>
                        <div class="box_mean">

                            <p class="box_mean-translate">Translate: {{ translate.translate }}</p>
                            <p class="box_mean-description">Description: {{ translate.description }}</p>
                            <p class="box_mean-description">Description in original language: {{
                                translate.original_language_description }}</p>
                            <div class="box_mean_router">
                                <router-link :to="{ name: 'Edit Translate', params: { id: translate.id } }"
                                    class="btn btn-all-add-edit word-botton"><i class="fas fa-edit"></i> Edit
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            languages: [],
            translates: [],
            word: {},
            wordId: 0
            // key_word_action: ""
        }
    },
    created() {
        this.axios
            .get(`/api/word/alldata/${this.$route.params.id}`)
            .then((response) => {
                if (response.data.status === 200) {
                    this.translates = response.data.data.translates;
                    this.languages = response.data.data.languages;
                    this.word = response.data.data.wordDefault;
                    this.wordId = this.word.id;
                }

            });
    },
    methods: {

    }
}
</script>

<style style lang="scss"></style>