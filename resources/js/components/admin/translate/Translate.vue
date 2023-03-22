<template>
    <div class="translate">
        <!-- <h3 class="text-center">Search</h3> -->
        <div class="mt-3">
            <form class="mb-4" @submit.prevent="searchAction">
                <div class="translate-body">
                    <div class="custom-search">
                        <input @input="onInputChange" class="search-input input" id="search-input"
                            v-model="searchData.keyword" placeholder="Search..." />
                        <div @click.prevent="showKeyboard = !showKeyboard" class="btn-keyboard">
                            <i class="fas fa-keyboard"></i>
                        </div>
                        <div class="right-custom-search">
                            <button type="submit" class="">Search</button>
                        </div>
                    </div>
                </div>
                <viewkeyboard v-if="showKeyboard" @onChange="onChange" @onKeyPress="onKeyPress" :input="input" />
                <div class="btn-group translate-body" role="group" aria-label="Basic radio toggle button group">
                    <div class="language shadow-sm bg-white rounded" v-for="(language, index) in languages"
                        :key="language.id">
                        <input type="radio" class="btn-check" v-model="searchData.language_id" :id="`btn-radio${index + 1}`"
                            :value="`${language.id}`" name="language_id" autocomplete="off" />
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

                        <div v-if="suggestedWords.length > 0" class="suggested-words">
                            <h6>Suggested words</h6>
                            <div @click="searchSuggestedWords(suggestedWord.word)" class="result search_data translate-body"
                                v-for="(suggestedWord, index) in suggestedWords" :key="index">
                                <div class="search_content">
                                    <div class="">
                                        <p class="title">{{ suggestedWord.word }}</p>
                                        <p class="box_mean-language">
                                            {{ suggestedWord.translate }}
                                        </p>
                                    </div>
                                </div>
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
                <div class="col-md-9">
                    <h6>Word details</h6>
                    <div class="search_data translate-body">
                        <div class="title">
                            <p>{{ keywordAction }}</p>
                        </div>
                        <div class="text-danger">
                            {{ translates.length === 0 ? "Không tìm thấy kết quả nào" : "" }}
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
import viewkeyboard from "../../layouts/viewkeyboard.vue";

export default {
    components: { viewkeyboard },
    props: {},
    mounted() { },
    data() {
        return {
            showKeyboard: false,
            input: "",
            languages: [],
            searchData: {
                keyword: "con mèo",
                language_id: 3,
            },
            translates: [],
            suggestedWords: [],
            keywordAction: "",
            result: "",
            topSearchWords: [],

            // keyboard: null
        };
    },
    created() {
        this.axios.get("/api/languages").then((response) => {
            this.languages = response.data;
        });
        this.axios.get("/api/word/top-search-words").then((response) => {
            this.topSearchWords = response.data;
        });
        console.log(this.languages);
    },
    methods: {
        searchAction() {
            this.axios
                .post("/api/translate/search", this.searchData)
                .then((response) => {
                    // this.$router.push({ name: 'languages' })

                    this.translates = response.data.translationWords;
                    this.suggestedWords = response.data.suggestedWords;
                    this.keywordAction = this.searchData.keyword;
                    if (response.data.translation_words.length > 0) {
                        this.result = response.data.translation_words[0].translate;
                    }

                    console.log(response.data);
                })
                .catch((error) => console.log(error))
                .finally(() => (this.loading = false));
        },
        searchSuggestedWords($searchKeyword) {
            this.searchData.keyword = $searchKeyword;
            console.log(this.searchData);
            this.searchAction();
        },
        onChange(input) {
            this.searchData.keyword = input;
        },
        onKeyPress(button) {
            // eslint-disable-next-line
            console.log("button", button);
        },
        onInputChange(input) {
            this.input = input.target.value;
        },
    },
    // code test keyboard
    watch: {
        // input(input) {
        //     this.keyboard.setInput(input);
        // }
    },
};
</script>
  
<style lang="scss">
.translate {
    .translate-body {
        margin: 10px 0;
    }

    .result {
        min-height: 100px;
    }

    .custom-search {
        height: 50px;
        position: relative;
        border: 1px solid #ccc;
        border-radius: 24px;
        overflow: hidden;

        .search-input {
            width: 100%;
            height: 100%;
            font-size: 18px;
            padding: 0 220px 4px 24px;
            color: #333;
            border: none;
            outline: none;
            appearance: none;
            background-color: #fff;

            &:focus {
                background-color: #fff;
            }
        }

        .right-custom-search {
            position: absolute;
            right: 0;
            top: 0;

            button {
                border: none;
                width: 100px;
                height: 50px;
                background-color: #091e42f2;
                color: #fff;
            }
        }
    }

    .search_data {
        background-color: #fff;
        border-radius: 9px;
        padding: 40px;

        //   min-height: 500px;
        .title {
            color: #e13a33;
            font-size: 1.5rem;
            font-weight: 500;
            min-height: 40px;
        }

        .search_content {
            margin-top: 12px;
            position: relative;
            background-color: #fff;

            .icon-dot {
                position: absolute;
                top: 3px;
                color: #707070;
                font-size: 0.9rem;
            }

            .box_mean {
                margin-left: 25px;
            }
        }
    }

    .search_data .search_content .bonx_mean .bonx_mea-language,
    .bonx_mea-description,
    .bonx_mea-translate {
        color: #363636;
    }

    .search_content button:hover {
        color: #53b5fc;
        cursor: pointer;
    }

    .language {
        margin-right: 10px;
        color: #000;
        width: 150px;
        font-size: 1rem;

        label {
            display: inline-block;
            width: 100%;
        }
    }

    .btn-keyboard i {
        cursor: pointer;
        color: #091e42f2;
        font-size: 35px;
        position: absolute;
        right: 120px;
        top: 5px;
    }

    .result:hover {
        border: 1px solid #53b5fc;
        transition: all 0.4ms;
        cursor: pointer;
    }

    .box_mean-description {
        color: #091e42f2;
    }
}
</style>