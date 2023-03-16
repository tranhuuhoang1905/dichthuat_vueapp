<template>
    <div class="container-xl">
        <h3 class="text-center">Search</h3>
        <div class="">
            <form class="" @submit.prevent="searchAction">
                <div class="translate-body">
                    <div class="custom-search">
                        <input type="search" class="search-input" id="search-input" v-model="search_data.key_word"
                            placeholder="Search...">
                        <div class="right-custom-search">
                            <button type="submit" class="">Search</button>
                        </div>
                    </div>
                </div>

                <div class="btn-group translate-body" role="group" aria-label="Basic radio toggle button group">
                    <div class="language" v-for="(language, index) in languages" :key="language.id">
                        <input type="radio" class="btn-check" v-model="search_data.language_id"
                            :id="`btn-radio${index + 1}`" :value="`${language.id}`" name="language_id" autocomplete="off">
                        <label class="btn btn-outline-primary" :for="`btn-radio${index + 1}`">{{ language.name }}</label>
                    </div>
                </div>

            </form>
            <div class="search_data translate-body">
                <div class="title">
                    <p>{{ this.key_word_action }}</p>
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
</template>

<script>
export default {
    data() {
        return {
            languages: [],
            search_data: {
                'key_word': 'con mèo',
                'language_id': 1
            },
            translates: [],
            key_word_action: ""
        }
    },
    created() {
        this.axios
            .post('/api/languages')
            .then((response) => {
                this.languages = response.data;
            });
        console.log(this.languages);
    },
    methods: {
        searchAction() {
            this.axios
                .post('/api/translate/search', this.search_data)
                .then(response => {
                    // this.$router.push({ name: 'languages' })

                    this.translates = response.data;
                    this.key_word_action = this.search_data.key_word;
                    console.log(response.data);
                })
                .catch(error => console.log(error))
                .finally(() => this.loading = false)
        }
    }
}
</script>

<style>
.translate-body {
    margin: 10px 0;
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
}

.language label {
    color: #7c7c7c;
    width: 150px;
}
</style>