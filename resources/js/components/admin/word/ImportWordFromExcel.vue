<template>
  <div class="import_word_from_excel">
    <div class="row">
      <div class="card show border border-0">
        <div class="card-body">
          <h4 class="card-title text-center fs-4">Import Word From Excel</h4>
          <div class="col-md-12 d-flex flex-column align-items-center">
            <form @submit.prevent="importWordsFromExcel">
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
              <div class="choose-file">
                <!-- <label> -->
                <input
                  class="px-0 py-2"
                  type="file"
                  accept=".xlsx, .xls"
                  ref="fileInput"
                  required
                  @change="onFileChange"
                />
                <button class="btn-choose-file" @click.prevent="openFileDialog">
                  Choose file
                </button>
                <span v-if="!fileSelected">No file chosen</span>
                <span v-else>{{ selectedFile }}</span>
                <!-- </label> -->
              </div>
              <div class="d-flex justify-content-center">
                <button
                  type="submit "
                  class="btn-all-add-edit py-2 px-5 rounded border border-0 my-3"
                >
                  Upload
                </button>
              </div>
              <p>
                *: Provide an Excel file. Use column A for new words, column B
                for translations, column C for descriptions in the original
                language (optional), and column D for translations (optional).
                Leave the description columns blank if there is no information.
              </p>
            </form>
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
      word: {},
      WordsFromExcel: {},
      fileSelected: false,
      selectedFile: "",
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
    importWordsFromExcel() {
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
        .post("/api/word/save-words-from-excel", formData, {
          responseType: "blob",
        })
        .then((response) => {
          this.$router.push({ name: "words" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openFileDialog() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile.size > 1000000) {
        alert("The selected file must be under 1MB in size.");
        this.selectedFile = "";
        this.fileSelected = false;
      } else {
        this.selectedFile = selectedFile.name;
        this.fileSelected = true;
      }
    },
  },
};
</script>
