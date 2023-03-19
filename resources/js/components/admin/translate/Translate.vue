<template>
    <div class="container-xl translate">
        <h3 class="text-center">Search</h3>
        <div class="">
            <form class="" @submit.prevent="searchAction">
                <div class="translate-body">
                    <div class="custom-search">
                        <input type="search" class="search-input" id="search-input" v-model="searchData.keyword"
                            placeholder="Search...">
                        <div class="right-custom-search">
                            <button type="submit" class="">Search</button>
                        </div>
                    </div>
                </div>

                <div class="btn-group translate-body" role="group" aria-label="Basic radio toggle button group">
                    <div class="language" v-for="(language, index) in languages" :key="language.id">
                        <input type="radio" class="btn-check" v-model="searchData.language_id" :id="`btn-radio${index + 1}`"
                            :value="`${language.id}`" name="language_id" autocomplete="off">
                        <label class="btn btn-outline-primary" :for="`btn-radio${index + 1}`">{{ language.name }}</label>
                    </div>
                </div>
            </form>
            <div class="row">
                <div class="col-md-3">
                    <div class="translate-left-sidebar">
                        <div v-if="translates.length > 0">
                            <h6>Result</h6>
                            <div class="result search_data translate-body">
                                <div class="search_content">
                                    <div class="">
                                        <p class="title">{{ keywordAction }}</p>
                                        <p class="box_mean-language">{{ result }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="suggestedWords.length > 0">
                            <h6>Suggested words</h6>
                            <div class="result search_data translate-body" v-for="(suggestedWord, index) in suggestedWords">
                                <div class="search_content">
                                    <div class="">
                                        <p class="title">{{ suggestedWord.word }}</p>
                                        <p class="box_mean-language">{{ suggestedWord.translate }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="suggestedWords.length == 0 && translates.length == 0">
                            <h6> Top search words</h6>
                            <div class="search_content" v-for="(topSearchWord, index) in topSearchWords">
                                <button>{{ topSearchWord.word }}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">

                    <h6>Word details</h6>
                    <div class="search_data translate-body">
                        <div class="title">
                            <p>{{ keywordAction }}</p>
                        </div>
                        <div>{{ translates.length === 0 ? 'không tìm thấy kết quả nào' : '' }}</div>
                        <div class="search_content" v-for="(translate, index) in translates">
                            <hr>
                            <div class="icon_dot">{{ index + 1 }})</div>
                            <div class="box_mean">
                                <p class="box_mean-language">{{ translate.language }}</p>
                                <p class="box_mean-translate"> {{ translate.translate }}</p>
                                <p class="box_mean-description">{{ translate.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div :class="keyboardClass"></div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import { and } from "vuelidate/lib/validators";
export default {
    props: {
        keyboardClass: {
            default: "simple-keyboard",
            type: String
        },
        input: {
            type: String
        }
    },
    mounted() {
        this.keyboard = new Keyboard(this.keyboardClass, {
            onChange: this.onChange,
            onKeyPress: this.onKeyPress
        });
    },
    data() {
        return {
            languages: [],
            searchData: {
                'keyword': 'con mèo',
                'language_id': 3
            },
            translates: [],
            suggestedWords: [],
            keywordAction: "",
            result: "",
            topSearchWords: [],

            keyboard: null
        }
    },
    created() {
        this.axios
            .get('/api/languages')
            .then((response) => {
                this.languages = response.data;
            });
        this.axios
            .get('/api/word/top-search-words')
            .then((response) => {
                this.topSearchWords = response.data;
            });
        console.log(this.languages);
    },
    methods: {
        searchAction() {
            this.axios
                .post('/api/translate/search', this.searchData)
                .then(response => {
                    // this.$router.push({ name: 'languages' })

                    this.translates = response.data.translationWords;
                    this.suggestedWords = response.data.suggestedWords;
                    this.keywordAction = this.searchData.keyword;
                    if (response.data.translation_words.length > 0) {
                        this.result = response.data.translation_words[0].translate;
                    }

                    console.log(response.data);
                })
                .catch(error => console.log(error))
                .finally(() => this.loading = false)
        },
        onChange(input) {
            this.$emit("onChange", input);
        },
        onKeyPress(button) {
            this.$emit("onKeyPress", button);
            /**
             * If you want to handle the shift and caps lock buttons
             */
            if (button === "{shift}" || button === "{lock}") this.handleShift();
        },
        handleShift() {
            let currentLayout = this.keyboard.options.layoutName;
            let shiftToggle = currentLayout === "default" ? "shift" : "default";
            this.keyboard.setOptions({
                layoutName: shiftToggle
            });
        }
    },
    watch: {
        input(input) {
            this.keyboard.setInput(input);
        }
    }
}
</script>

<style>
.translate .translate-body {
    margin: 10px 0;
}

.translate .result {
    min-height: 100px !important;
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

.search_data {
    background-color: #fff;
    border-radius: 9px;
    padding: 40px;
    min-height: 500px;
}

.search_data .title {
    color: #e13a33;
    font-size: 1.5rem;
    font-weight: 500;
    min-height: 40px;
}

.search_data .search_content {
    margin-top: 12px;
    position: relative;
    background-color: #fff;
}

.search_data .search_content .icon-dot {
    position: absolute;
    top: 3px;
    color: #707070;
    font-size: .9rem;
}

.search_data .search_content .box_mean {
    margin-left: 25px;
}

.search_data .search_content .bonx_mean .bonx_mea-language,
.bonx_mea-description,
.bonx_mea-translate {
    color: #363636;
}

.language {
    margin-right: 10px;
    color: #7c7c7c;
    width: 150px;
    font-size: 1rem;
}

.language label {
    display: inline-block;
    width: 100%;
}
</style>