<template>
  <div class="add_word">
    <div class="row">
      <div class="card show border border-0">
        <div class="card-body">
          <h4 class="card-title text-center fs-4">Add Word</h4>
          <div class="col-md-12">
            <form @submit.prevent="addWord">
              <div class="row">
                <div class="col-md-6 col-sm-12">
                  <div class="form-group">
                    <label>Word:</label>
                    <vue3-simple-typeahead class="border border-1 p-0 ps-3" id="typeahead_id"
                      placeholder="Start writing..." :items="suggestions" :minInputLength="3"
                      :itemProjection="itemProjectionFunction" @selectItem="selectItemEventHandler"
                      @onInput="onInputEventHandler" v-model="FormData.word">
                      <template #list-item-text="slot" :class="{ hidden: true }"><span v-html="
                        slot.boldMatchText(slot.itemProjection(slot.item))
                      "></span></template>
                    </vue3-simple-typeahead>
                  </div>
                  <div class="form-group">
                    <label>Description</label>
                    <textarea type="text" placeholder="Enter description" class="form-control"
                      v-model="FormData.description" rows="4" required></textarea>
                  </div>
                  <div class="form-group">
                    <label>Language</label>
                    <select class="form-select" aria-label="Default select example" v-model="FormData.language_id"
                      required>
                      <option v-for="language in languages" :key="language.id" :value="`${language.id}`">
                        {{ language.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="col-md-6 col-sm-12">
                  <div class="form-group">
                    <label>Translate</label>
                    <input type="text" placeholder="Enter translated word" class="form-control"
                      v-model="FormData.translate" required />
                  </div>
                  <div class="form-group">
                    <label>Translate description</label>
                    <textarea type="text" placeholder="Enter description" class="form-control"
                      v-model="FormData.translate_description" rows="4" required></textarea>
                  </div>
                  <div class="form-group">
                    <label>Language translate id</label>
                    <select class="form-select" aria-label="Default select example"
                      v-model="FormData.language_translate_id" required>
                      <option v-for="language in languages" :key="language.id" :value="`${language.id}`">
                        {{ language.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-all-add-edit">
                  Add Word
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="showWordDefault">
      <div class="word_default">
        <h3 class="text-center">Word Default</h3>
        <div class="row">
          <div class="col-md-4">
            <h4>Word</h4>
            <div class="word-default-data shadow-lg border border-0">
              <div class="word-content">
                <div class="box_mean">
                  <div class="title">
                    <p>{{ wordDefault.word }}</p>
                  </div>
                  <p class="box_mean-language">
                    Language: {{ wordDefault.language }}
                  </p>
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
              <div class="word-content" v-for="(translate, index) in translatesDefault" :key="index">
                <hr v-if="index > 0" />
                <div class="icon_dot">
                  {{ index + 1 }}) &nbsp;<span class="box_mean-language">Language: {{ translate.language }}</span>
                </div>
                <div class="box_mean">
                  <p class="box_mean-translate">
                    Translate: {{ translate.translate }}
                  </p>
                  <p class="box_mean-description">
                    Description: {{ translate.description }}
                  </p>
                  <p class="box_mean-description">
                    Description in original language:
                    {{ translate.original_language_description }}
                  </p>
                  <div class="box_mean_router">
                    <router-link :to="{
                      name: 'Edit Translate',
                      params: { id: translate.id },
                    }" class="btn btn-all-add-edit word-botton"><i class="fas fa-edit"></i> Edit
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      showWordDefault: false,
      languagesDefault: [],
      translatesDefault: [],
      wordDefault: {},
      wordId: 0,

      languages: [],
      word: {},
      WordsFromExcel: {},
      message: "",
      userInput: "",
      suggestedKeywords: [],
      FormData: {},
      itemProjectionFunction: (item) => item.word.toLowerCase(),
    };
  },
  created() {
    console.log(this.$config.notificationTimer);
    this.axios.get("/api/languages").then((response) => {
      if (response.data.message === "success") {
        this.languages = response.data.data;
        if (response.data.data.length > 0) {
          this.FormData.language_id = this.FormData.language_translate_id =
            response.data.data[0].id;
        }
      }
    });
  },
  computed: {
    suggestions() {
      return this.suggestedKeywords.filter((keyword) =>
        keyword.word.toLowerCase().startsWith(this.userInput.toLowerCase())
      );
    },
  },
  methods: {
    addWord() {
      this.axios
        .post("/api/word/add", this.FormData)
        .then((response) => {
          if (response.data.status === 200) {
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: `Add Word ${this.FormData.word} success`,
              showConfirmButton: false,
              timer: this.$config.notificationTimer ?? 1000,
            });
            // alert(response.data.message);
            this.FormData.translate = "";
            this.FormData.translate_description = "";
            // this.$router.push({ name: "All Word"});
          }
        })
        .catch((error) => {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Error ${error.response.status}: ${error.response.data.message}`,
            // footer: '<a href="">Why do I have this issue?</a>'
          });
          // alert(`Error ${error.response.status}: ${error.response.data.message}`);
        })
        .finally(() => (this.loading = false));
    },
    getWord(keyword) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/word/suggestions", { keyword: keyword })
          .then((response) => {
            if (response.data.status === 200) {
              this.suggestedKeywords = response.data.data.words;
            }
            resolve();
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },
    selectItemEventHandler(item) {
      this.FormData.id = item.id;
      this.dataWordDefault();
      this.FormData.word = item.word;
      this.FormData.description = item.description;
      this.wordDefault = true;
    },
    onInput(value) {
      this.userInput = value;
    },
    onInputEventHandler(value) {
      if (value.input !== this.FormData.word) {
        this.FormData.word = value.input;
      }
      if (value.input.length >= 3) {
        this.getWord(value.input);
      }
    },
    dataWordDefault() {
      this.showWordDefault = true;
      this.axios
        .get(`/api/word/alldata/${this.FormData.id}`)
        .then((response) => {
          if (response.data.status === 200) {
            this.translatesDefault = response.data.data.translates;
            this.languagesDefault = response.data.data.languages;
            this.wordDefault = response.data.data.wordDefault;
            this.wordId = this.wordDefault.id;
          }
        });
    },
  },
  components: {
    // WordDefaultVue
  },
};
</script>