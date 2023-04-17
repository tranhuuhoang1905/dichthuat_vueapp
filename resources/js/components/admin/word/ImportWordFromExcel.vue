<template>
  <div class="import_word_from_excel">
    <div class="row d-flex justify-content-center">
      <div class="col-md-7">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">Import Word From Excel</h4>
            <div class="col-md-12">
              <form @submit.prevent="importWordsFromExcel">
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
                  <button type="submit " class="btn-all-add-edit py-2 px-5 rounded border border-0 my-3">
                    Upload
                  </button>
                </div>
                <p>
                  *: Please provide an Excel file with the following format:<br>

                  Column A: New words (Vietnamese language)<br>
                  Column B: Translations<br>
                  Column C: Descriptions in original language (optional)<br>
                  Column D: Translations of descriptions (optional)<br>
                  Leave the description columns blank if there is no information. Cell A1 should contain the keyword for
                  the Vietnamese language (VN), and cell B1 should contain the keyword for the translated language. The
                  second row can be used for descriptions, and the translation process can start from row 3.
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
      if (response.data.message === 'success') {
        this.languages = response.data.data;
        if (response.data.data.length > 0) {
          this.word.language_id = this.word.language_translate_id =
            response.data.data[0].id;
        }
      }

    });
  },
  methods: {
    async importWordsFromExcel() {
      const swalLoading = this.$swal.fire({
        title: 'Loading',
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

      this.axios
        .post("/api/word/save-words-from-excel", formData, {
          responseType: "blob",
        })
        .then((response) => {
          if (response.status === 200) {
            swalLoading.update({
              title: 'File import successful',
              icon: 'success',
              showConfirmButton: false,
            });
          } else {
            swalLoading.update({
              title: 'File import false',
              icon: 'error',
              showConfirmButton: false,
            });
          }
          setTimeout(() => {
            swalLoading.close();
          }, 1500);

        })
        .catch((error) => {
          swalLoading.update({
            title: `Error ${error.response.status}`,
            icon: 'error',
            showConfirmButton: false,
          });
          setTimeout(() => {
            swalLoading.close();
          }, 1500);
        })
        .finally(
      );
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
