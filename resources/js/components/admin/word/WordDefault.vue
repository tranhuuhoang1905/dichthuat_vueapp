<template>
    <div class="word_default">
        <h3 class="text-center">Word Default</h3>
        <div class="row">
            <div class="col-md-4">
                <h4>Word</h4>
                <div class="word-default-data shadow-lg border border-0  translate-body">
                    <div class="search_content">
                        <div class="box_mean">
                            <div class="title">
                                <p>{{ word.word }}</p>
                            </div>
                            <p class="box_mean-language">Language: {{ word.language }}</p>
                            <router-link :to="{ name: 'Edit Word', params: { id: wordId } }" class="btn btn-all-add-edit"><i
                                    class="fas fa-edit"></i>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <h4>Translate</h4>
                <div class="search-data shadow-lg border border-0 translate-body">
                    <div class="search_content" v-for="(translate, index) in translates " :key="index">
                        <hr v-if="index > 0">
                        <div class="icon_dot">{{ index + 1 }}) &nbsp;<span class="box_mean-language">Language: {{
                            translate.language }}</span></div>
                        <div class="box_mean">

                            <p class="box_mean-translate">Translate: {{ translate.translate }}</p>
                            <p class="box_mean-description">Description: {{ translate.description }}</p>
                            <p class="box_mean-description">Description in original language: {{
                                translate.original_language_description }}</p>
                            <router-link :to="{ name: 'Edit Translate', params: { id: translate.id } }"
                                class="btn btn-all-add-edit"><i class="fas fa-edit"></i>
                            </router-link>
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

<style>
.translate-body {
    margin: 10px 0;
    font-size: 21.8px;
}


.word-default-data {
    background-color: #fff;
    border: 1px solid #959595;
    border-radius: 9px;
    padding: 40px;
    min-height: 20px;
}

.word-default-data .title {
    color: #e13a33;
    font-size: 1.5rem;
    font-weight: 500;
    min-height: 40px;
}

.custom-search {
    height: 50px;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 24px;
    overflow: hidden;
}

.custom-search .search-input {
    width: 100%;
    height: 100%;
    font-size: 18px;
    padding: 0 220px 4px 24px;
    color: #333;
    border: none;
    outline: none;
    appearance: none;
    background-color: #fff;
}

.custom-search .search-input:focus {
    /* Thiết lập lại màu nền và màu chữ cho thanh input khi được chọn */
    background-color: #fff;
}

.custom-search .right-custom-search {
    position: absolute;
    right: 0;
    top: 0;
}

.custom-search .right-custom-search button {
    width: 100px;
    height: 50px;
    background-color: #202124;
    color: #fff;
}

.search-data {
    background-color: #fff;
    border-radius: 9px;
    padding: 40px;
    min-height: 500px;
}

.search-data .title {
    color: #e13a33;
    font-size: 1.5rem;
    font-weight: 500;
    min-height: 40px;
}

.search-data .search_content {
    margin-top: 12px;
    position: relative;
    background-color: #fff;
}

.search-data .search_content .icon-dot {
    position: absolute;
    top: 3px;
    color: #707070;
    font-size: .9rem;
}

.search-data .search_content .box_mean {
    margin-left: 25px;
}

.search-data .search_content .bonx_mean .bonx_mea-language,
.bonx_mea-description,
.bonx_mea-translate {
    color: #363636;
}

.language {
    margin-right: 10px;
}

.language label {
    color: #000;
    width: 150px;
}
</style>