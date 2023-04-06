<template>
    <div class="translate">
        <div class="mt-3">
            <form class="mb-4" @submit.prevent="searchAction">
                <div class="translate-body">
                    <div class="custom-search">
                        <input @input="onInputChange" class="search-input input" id="search-input"
                            v-model="searchData.keyword" placeholder="Search..." />
                        <div @click.prevent="onClear" class="btn-clear-input">
                            <i class="fas fa-times"></i>
                        </div>
                        <div @click.prevent="showKeyboard = !showKeyboard" class="btn-keyboard d-none d-md-block">
                            <i class="fas fa-keyboard"></i>
                        </div>
                        <div class="right-custom-search">
                            <button type="submit" class="">Search</button>
                        </div>
                    </div>
                </div>
                <viewkeyboard v-if="showKeyboard" @onChange="onChange" @onKeyPress="onKeyPress" :input="input" />
                <div class="btn-group translate-body col-12" role="group" aria-label="Basic radio toggle button group">
                    <div class="language shadow-sm rounded" v-for="(language, index) in languages" :key="language.id">
                        <input type="radio" class="btn-check" v-model="searchData.language_id" :id="`btn-radio${index + 1}`"
                            :value="`${language.id}`" name="language_id" autocomplete="off" />
                        <label class="btn" :for="`btn-radio${index + 1}`">{{ language.name }}</label>
                    </div>
                    <div class="language shadow-sm rounded">
                        <input type="radio" class="btn-check" v-model="searchData.language_id" :id="`btn-radio0`" :value="0"
                            name="language_id" autocomplete="off" />
                        <label class="btn" :for="`btn-radio0`">All Language</label>
                    </div>
                </div>
            </form>
            <div class="row">
                <div class="col-md-3 arrange-order-2">
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

                        <div v-if="suggestedWords.length > 0" class="suggested-words">
                            <h6>Suggested words</h6>
                            <div @click="searchSuggestedWords(suggestedWord.word)" class="result search_data translate-body"
                                v-for="(suggestedWord, index) in displayedItems" :key="index">
                                <div class="search_content">
                                    <div class="">
                                        <p class="title">{{ suggestedWord.word }}</p>
                                        <p class="box_mean-language">
                                            {{ suggestedWord.translate }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="showmore">
                                <a v-if="showCount < suggestedWords.length" @click="showMore()">Show more</a>
                            </div>
                        </div>
                        <div v-if="suggestedWords.length == 0 && translates.length == 0">
                            <h6>Top search words</h6>
                            <div class="d-flex flex-wrap w-full">
                                <div class="search_content" v-for="(topSearchWord, index) in topSearchWords" :key="index">
                                    <button div @click="searchSuggestedWords(topSearchWord.word)"
                                        class="btn_search_content py-2 px-3 m-2 bg-white border border-0 rounded-pill shadow">
                                        {{ topSearchWord.word }}
                                        <!-- <i class="close-btn-search fas fa-times"></i> -->
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-9 arrange-order-1">
                    <h6>Word details</h6>
                    <div class="search_data translate-body">
                        <div class="title">
                            <p>{{ keywordAction }}</p>
                        </div>
                        <div class="text-danger">
                            {{ translates.length === 0 ? "No results found" : "" }}
                        </div>
                        <div class="search_content" v-for="(translate, index) in translates" :key="index">
                            <hr />
                            <div class="icon_dot d-flex justify-content-between align-items-center">
                                <p class="text text-secondary fs-6 align-items-center">
                                    {{ index + 1 }}) &emsp;
                                    <span class="fs-4 text-black">
                                        {{ translate.translate }}</span>
                                </p>
                                <p>{{ translate.language }}</p>
                            </div>
                            <div class="box_mean">
                                <p class="box_mean-description">{{ translate.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- code test keyboard -->
    <!-- <div :class="keyboardClass"></div> -->
</template>
  
<script>
import viewkeyboard from "../layouts/viewkeyboard.vue";

export default {
    components: { viewkeyboard },
    props: {},
    mounted() { },
    data() {
        return {
            index: 0,
            showKeyboard: false,
            input: "",
            languages: [],
            searchData: {
                keyword: "",
                language_id: 0,
            },
            translates: [],
            suggestedWords: [],
            showCount: 3,
            keywordAction: "",
            result: "",
            topSearchWords: [],

            // keyboard: null
        };
    },
    created() {

        this.axios.get("/api/languages").then((response) => {
            if (response.data.message === 'success') {
                this.languages = response.data.data;
            }
        });
        this.topSearch();

    },
    methods: {
        searchAction() {
            if (this.searchData.keyword !== "") {
                this.axios
                    .post("/api/translate/search", this.searchData)
                    .then((response) => {
                        // this.$router.push({ name: 'All Language' })
                        if (response.data.status === 200) {
                            this.translates = response.data.data.translationWords;
                            this.suggestedWords = response.data.data.suggestedWords;
                            this.keywordAction = this.searchData.keyword;
                            if (response.data.data.translation_words.length > 0) {
                                this.result = response.data.data.translation_words[0].translate;
                            }
                        }

                    })
                    .catch((error) => { })
                    .finally(() => (this.loading = false));
            } else {
                this.translates = [];
                this.suggestedWords = [];
                this.keywordAction = "";
            }

        },
        searchSuggestedWords($searchKeyword) {
            this.searchData.keyword = $searchKeyword;
            this.searchAction();
        },
        onClear() {
            this.searchData.keyword = "";
        },
        onChange(input) {
            this.searchData.keyword = input;
        },
        onKeyPress(button) {
            // eslint-disable-next-line
        },
        onInputChange(input) {
            this.input = input.target.value;
        },
        topSearch() {
            this.axios.post("/api/translate/top-search-words", this.searchData).then((response) => {
                if (response.data.message === 'success') {
                    this.topSearchWords = response.data.data;
                }

            });
        },
        showMore() {
            this.showCount += 3;
        },
    },
    // code test keyboard
    watch: {
        'searchData.language_id': function (newValue, oldValue) {
            this.topSearch();
            this.searchAction();
        },
        'searchData.keyword': function (newValue, oldValue) {
            console.log("check keywword", newValue);
            if (newValue === "") {
                console.log("check keywword", newValue);
                this.topSearch();
                this.searchAction();
            }
        }
    },
    computed: {
        displayedItems() {
            return this.suggestedWords.slice(0, this.showCount);
        },
    },
};
</script>
  
<style lang="scss">
.showmore {
    text-align: right;
    margin-right: 5px;
    cursor: pointer;
    text-decoration: underline;
}

@media only screen and (max-width: 767px) {
    .arrange-order-2 {
        order: 2;
    }

    .arrange-order-1 {
        order: 1;
    }
}
</style>