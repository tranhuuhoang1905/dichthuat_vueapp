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
                    <!-- <input type="text" placeholder="Enter new word" class="form-control" v-model="word.word" required /> -->
                    <vue3-simple-typeahead class="border border-1 p-0 ps-3" id="typeahead_id" placeholder="Start writing..." :items="suggestions" :minInputLength="3"
                    :itemProjection="itemProjectionFunction" @selectItem="selectItemEventHandler" @onInput="onInputEventHandler"
                    v-model="FormData.word">
                    <template #list-item-text="slot" :class="{ 'hidden': true }"><span
                        v-html="slot.boldMatchText(slot.itemProjection(slot.item))"></span></template>
                  </vue3-simple-typeahead>
                  </div>
                  <div class="form-group">
                    <label>Description</label>
                    <textarea type="text" placeholder="Enter description" class="form-control" v-model="FormData.description"
                      rows="4" required></textarea>
                  </div>
                  <div class="form-group">
                    <label>Language</label>
                    <select class="form-select" aria-label="Default select example" v-model="FormData.language_id" required>
                      <option v-for="language in languages" :key="language.id" :value="`${language.id}`">
                        {{ language.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="col-md-6 col-sm-12">
                  <div class="form-group">
                    <label>Translate</label>
                    <input type="text" placeholder="Enter translated word" class="form-control" v-model="FormData.translate"
                      required />
                  </div>
                  <div class="form-group">
                    <label>Translate description</label>
                    <textarea type="text" placeholder="Enter description" class="form-control"
                      v-model="FormData.translate_description" rows="4" required></textarea>
                  </div>
                  <div class="form-group">
                    <label>Language translate id</label>
                    <select class="form-select" aria-label="Default select example" v-model="FormData.language_translate_id"
                      required>
                      <!-- <option :value="-1" selected>Open this select menu</option> -->
                      <option v-for="language in languages" :key="language.id" :value="`${language.id}`">
                        {{ language.name }}
                      </option>
                    </select>
                    <!-- <input type="text" class="form-control" v-model="word.language_translate_id"> -->
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-all-add-edit">Add Word</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <word-default-vue v-if="wordDefault"/>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import WordDefaultVue from './WordDefault.vue'
export default {
  data() {
    return {
      wordDefault:false,
      languages: [],
      word: {},
      WordsFromExcel: {},
      message: '',
      userInput: '',
      suggestedKeywords: [],
      FormData: {},
      itemProjectionFunction: item => item.word.toLowerCase()
    };
  },
  created() {
    console.log(this.$config.notificationTimer);
    this.axios.get("/api/languages").then((response) => {
      if (response.data.message === 'success') {
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
      return this.suggestedKeywords.filter(keyword =>
        keyword.word.toLowerCase().startsWith(this.userInput.toLowerCase())
      );
    }
  },
  methods: {
    addWord() {
      
      this.axios
        .post("/api/word/add", this.FormData)
        .then((response) => {
          if (response.data.status === 200) {
            this.$swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Add Word ${this.FormData.word} success`,
              showConfirmButton: false,
              timer: this.$config.notificationTimer ?? 1000
            })
            // alert(response.data.message);
            this.FormData = {};
            if (this.languages.length > 0) {
              this.FormData.language_id = this.FormData.language_translate_id =
                this.languages[0].id;
            }
            // this.$router.push({ name: "All Word"});
          }

        })
        .catch((error) => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error ${error.response.status}: ${error.response.data.message}`,
            // footer: '<a href="">Why do I have this issue?</a>'
          })
          // alert(`Error ${error.response.status}: ${error.response.data.message}`);
        })
        .finally(() => (this.loading = false));
    },
    getWord(keyword) {
      return new Promise((resolve, reject) => {
        axios.post("/api/word/suggestions", { keyword: keyword })
          .then(response => {
            if (response.data.status === 200) {
              this.suggestedKeywords = response.data.data.words
            }
            resolve();
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
      });
    },
    selectItemEventHandler(item) {
      this.FormData.id = item.id;
      this.FormData.word = item.word;
      this.FormData.description = item.description;
      this.wordDefault = true;
    },
    onInput(value) {
      this.userInput = value
    },
    onInputEventHandler(value) {
      if (value.input !== this.FormData.word) {
        this.FormData.word = value.input;
      }
      if (value.input.length >= 3) {
        this.getWord(value.input);
      }
    },
  },
  components: {WordDefaultVue},
};
</script>