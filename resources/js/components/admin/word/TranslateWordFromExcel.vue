<template>
  <div class="translate_word_from_excel">
    <div class="row">
      <div class="row d-flex justify-content-center">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">
              Translate Word From Excel
            </h4>
            <div class="col-md-12 d-flex flex-column align-items-center">
              <form @submit.prevent="translateWordsFromExcel">
                <div class="form-group">
                  <label>Language</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="WordsFromExcel.language_id"
                    required
                  >
                    <option
                      v-for="language in languages"
                      :key="language.id"
                      :value="`${language.id}`"
                    >
                      {{ language.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Language translate id</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="WordsFromExcel.language_translate_id"
                    required
                  >
                    <!-- <option :value="-1" selected>Open this select menu</option> -->
                    <option
                      v-for="language in languages"
                      :key="language.id"
                      :value="`${language.id}`"
                    >
                      {{ language.name }}
                    </option>
                  </select>
                  <!-- <input type="text" class="form-control" v-model="word.language_translate_id"> -->
                </div>
                <input class="px-0 py-2" type="file" accept=".xlsx" ref="fileInput" />
                <div class="d-flex justify-content-center">
                <button type="submit" class="btn-all-add-edit py-2 px-5 rounded border border-0">Upload</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      languages: [],
      word: {},
      WordsFromExcel: {},
    };
  },
  created() {
    this.axios.get("/api/languages").then((response) => {
      this.languages = response.data;
      if (response.data.length > 0) {
        this.word.language_id = this.word.language_translate_id =
          response.data[0].id;
      }
    });
    console.log(this.languages);
  },
  methods: {
    translateWordsFromExcel() {
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("language_id", this.WordsFromExcel.language_id);
      formData.append(
        "language_translate_id",
        this.WordsFromExcel.language_translate_id
      );

      axios
        .post("/api/word/translate-words-from-excel", formData, {
          responseType: "blob",
        })
        .then((response) => {
          const blob = new Blob([response.data], {
            type: "application/vnd.ms-excel",
          });
          saveAs(blob, "translatecallback.xlsx");
          // this.$router.push({ name: 'words' });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>