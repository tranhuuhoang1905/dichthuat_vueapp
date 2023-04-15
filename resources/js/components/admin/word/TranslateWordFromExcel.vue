<template>
  <div class="translate_word_from_excel">
    <div class="row d-flex justify-content-center">
      <div class="col-md-7">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">
              Translate Word From Excel
            </h4>
            <div class="col-md-12">
              <form @submit.prevent="translateWordsFromExcel">
                <div class="choose-file">
                  <!-- <label> -->
                  <input class="px-0 py-2" type="file" accept=".xlsx, .xls" ref="fileInput" required
                    @change="onFileChange" />
                  <button class="btn-choose-file" @click.prevent="openFileDialog">
                    Choose file
                  </button>
                  <span v-if="!fileSelected">No file chosen</span>
                  <span v-else>{{ selectedFile }}</span>
                  <!-- </label> -->
                </div>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn-all-add-edit py-2 px-5 rounded border border-0 my-3">
                    Upload
                  </button>
                </div>
                <p>
                  *: Provide an Excel file with the words you want to translate
                  in column A. We'll send back a file with search results in
                  column B (blank if the word isn't in our database).
                </p>
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
      fileSelected: false,
      selectedFile: "",
    };
  },
  created() {
    this.axios.get("/api/languages").then((response) => {
      if (response.data.message === "success") {
        this.languages = response.data.data;
        if (response.data.data.length > 0) {
          this.word.language_id = this.word.language_translate_id =
            response.data.data[0].id;
        }
      }
    });
  },
  methods: {
    translateWordsFromExcel() {
      const swalLoading = this.$swal.fire({
        title: "Loading",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
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
          if (response.status === 200) {
            swalLoading.update({
              title: "File import successful",
              icon: "success",
              showConfirmButton: false,
            });
            // alert("File export successful");
            const blob = new Blob([response.data], {
              type: "application/vnd.ms-excel",
            });
            saveAs(blob, "translatecallback.xlsx");
          } else {
            swalLoading.update({
              title: "File import false",
              icon: "error",
              showConfirmButton: false,
            });
            // alert("File export failed");
          }
          setTimeout(() => {
            swalLoading.close();
          }, 1500);
          // this.$router.push({ name: 'All Word' });
        })
        .catch((error) => {
          swalLoading.update({
            title: `Error ${error.response.status}`,
            icon: "error",
            showConfirmButton: false,
          });
          setTimeout(() => {
            swalLoading.close();
          }, 1500);
        })
        .finally();
    },
    openFileDialog() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile.size > 1000000) {
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The selected file must be under 1MB in size.",
        });
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