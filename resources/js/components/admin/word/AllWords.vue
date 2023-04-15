<template>
  <div class="all_word">
    <div class="row">
      <div class="col-12">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">All Words</h4>
            <div class="">
              <table ref="myTable" class="table table-bordered table-striped table-hover display nowrap"></table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <button ref="myModalBtn" type="button" class="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog row p-5" role="document">
        <div class="modal-content col-md-12">
          <div class="row">
            <div class="word_default p-4">
              <h3 class="text-center">Word Default</h3>
              <div class="row">
                <div class="col-md-4">
                  <h4>Word</h4>
                  <div class="word-default-data shadow-lg border border-0">
                    <div class="word-content">
                      <div class="box_mean" v-for="(translate, index) in dataWords" :key="index">
                        <div class="title">
                          <p>
                            {{ translate.translate }}
                          </p>
                        </div>
                        <p class="box_mean-language">
                          Language:
                          {{ translate.language }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-8">
                  <h4>Translate</h4>
                  <div class="shadow-lg border border-0 word-default-data">
                    <div v-for="(translate, index) in dataWords" :key="index">
                      <form @submit.prevent="updateTranslate(translate.id)">
                        <div class="word-content">
                          <hr v-if="index > 0" />
                          <div class="icon_dot">
                            {{ index + 1 }}) &nbsp;
                            <div class="form-group box_mean-language">
                              <label>Language:</label>
                              <input type="text" class="form-control" v-model="translate.language" disabled />
                            </div>
                          </div>
                          <div class="box_mean">
                            <div class="form-group box_mean-translate">
                              <label>Translate:</label>
                              <input type="text" class="form-control" v-model="translate.translate" />
                            </div>
                            <div class="form-group box_mean-description">
                              <label>Description:</label>
                              <input type="text" class="form-control" v-model="translate.description" />
                            </div>
                            <div class="form-group box_mean-description">
                              <label> Description in original language:</label>
                              <input type="text" class="form-control" v-model="translate.original_language_description" />
                            </div>
                            <div class="box_mean_router">
                              <button type="submit" class="btn btn-all-add-edit word-botton">
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- add transalte -->
  <div class="row">
    <button ref="myModalAddTranslateBtn" type="button" class="btn btn-primary d-none" data-toggle="modal"
      data-target="#ModalAddTranslate">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="ModalAddTranslate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog row p-5" role="document">
        <div class="modal-content col-md-12">
          <div class="row">
            <div class="word_default p-4">
              <h3 class="text-center">Add Translate</h3>
              <div class="col-md-12">
                <form @submit.prevent="addWord">
                  <div class="row">
                    <div class="col-md-6 col-sm-12">
                      <div class="form-group">
                        <label>Word:</label>
                        <input type="text" placeholder="Enter word" class="form-control" v-model="FormAddWordData.word"
                          required />
                      </div>
                      <div class="form-group">
                        <label>Description</label>
                        <textarea type="text" placeholder="Enter description" class="form-control"
                          v-model="FormAddWordData.description" rows="4" required></textarea>
                      </div>
                      <div class="form-group">
                        <label>Language</label>
                        <select class="form-select" aria-label="Default select example"
                          v-model="FormAddWordData.language_id" required>
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
                          v-model="FormAddWordData.translate" required />
                      </div>
                      <div class="form-group">
                        <label>Translate description</label>
                        <textarea type="text" placeholder="Enter description" class="form-control"
                          v-model="FormAddWordData.translate_description" rows="4" required></textarea>
                      </div>
                      <div class="form-group">
                        <label>Language translate id</label>
                        <select class="form-select" aria-label="Default select example"
                          v-model="FormAddWordData.language_translate_id" required>
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
      </div>
    </div>
  </div>
</template>
 
<script>
import { exit } from "process";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import $ from "jquery";
import { createApp, h } from "vue";
import router from "@resources/js/router/index";
DataTable.use(DataTablesCore);
export default {
  data() {
    return {
      words: [],
      words_test: [],
      languages: [],
      dataWords: {},
      FormAddWordData: {},
    };
  },
  mounted() {

  },
  created() {
    this.fetchData();
  },
  methods: {
    updateTranslate(id) {
      const foundWord = this.dataWords.find(word => word.id === id); // Tìm kiếm từ trong mảng
      if (foundWord) {
        this.axios
          .post(`/api/translate/update/${id}`, {
            translate: foundWord.translate,
            description: foundWord.description,
            original_language_description: foundWord.original_language_description
          })
          .then((response) => {
            if (response.data.status === 200) {
              this.$swal.fire({
                position: "top-end",
                icon: "success",
                title: `Update Word abc Success`,
                showConfirmButton: false,
                timer: this.$config.notificationTimer ?? 1000,
              });
            }
          })
          .catch((error) => {
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: `Error ${error.response.status}: ${error.response.data.message}`,
            });
          })
          .finally(() => (this.loading = false));
      } else {
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Error: Translate not found`,
        });
      }

    },
    addWord() {
      this.axios
        .post("/api/word/add", this.FormAddWordData)
        .then((response) => {
          if (response.data.status === 200) {
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: `Add Word ${this.FormAddWordData.word} success`,
              showConfirmButton: false,
              timer: this.$config.notificationTimer ?? 1000,
            });
            // alert(response.data.message);
            // this.FormAddWordData = {};
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
    fetchData() {
      this.axios.post("/api/word/all-word").then((response) => {
        // this.words = response.data;
        if (response.data.status === 200 && response.data.success == true) {
          this.languages = response.data.data.languages;
          const isSmallScreen = window.innerWidth < 760;
          const pagingType = isSmallScreen ? "simple" : "simple_numbers";
          this.setColumns();
          this.table = $(this.$refs.myTable).DataTable({
            responsive: true,
            data: response.data.data.words_test,
            columns: this.columns,
            // lengthMenu: [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]], // set number of records per page
            pagingType: pagingType, // display only a few page buttons
            scrollX: true,
          });
        }
      });
    },
    actionEditStatus(rowData) {
      let dataReponsive = {};
      dataReponsive.status = rowData.status == 1 ? 0 : 1;
      this.axios
        .post(`/api/word/update/${rowData.word_id}`, dataReponsive)
        .then((response) => {
          if (response.data.status === 200) {
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: `Update Word ${rowData.word} Success`,
              showConfirmButton: false,
              timer: this.$config.notificationTimer ?? 1000,
            });
          }
        })
        .catch((error) => {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Error ${error.response.status}: ${error.response.data.message}`,
          });
        })
        .finally(() => (this.loading = false));
    },

    setColumns() {
      const self = this;
      // T?o d?ng 3 h�ng ng�n ng?

      const languageColumns = this.languages.map((language) => {
        return {
          data: "word_id",
          title: language.name,
          createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
            const app = createApp({
              render() {
                const dataLanguage = JSON.parse(`[${rowData.data}]`);
                if (
                  dataLanguage.find((lang) => lang.language_id === language.id)
                ) {
                  const translate = dataLanguage.find(
                    (lang) => lang.language_id === language.id
                  ).translate;
                  if (language.id == 1) {
                    return translate;
                  } else {
                    return [
                      translate,
                      h(
                        "button",
                        {
                          class: "btn btn-all-add-edit",
                          onClick: () => {
                            self.axios.post("/api/translate/get-translate-with-language",
                              { 'word_id': rowData.word_id, 'language_id': language.id }).then((response) => {
                                if (response.data.status === 200 && response.data.success == true) {
                                  self.dataWords = response.data.data.translations
                                }
                              });
                            self.$refs.myModalBtn.click();
                          },
                        },
                        "edit"
                      ),
                    ];
                  }

                } else {
                  return h(
                    "button",
                    {
                      class: "btn btn-all-add-edit",
                      onClick: () => {
                        console.log("check self.rowData", rowData);
                        self.FormAddWordData = {
                          language_id: rowData.language_id,
                          language_translate_id: language.id,
                          description: rowData.description,
                          word: rowData.word
                        };
                        self.$refs.myModalAddTranslateBtn.click();
                      },
                    },
                    "add"
                  );
                }
              },
              data() {
                return {

                  rowData: rowData,
                };
              },
            });
            app.mount(cell);
          },
          // render: function (data, type, row) {
          //   const dataLanguage = JSON.parse(`[${row.data}]`);
          //   if (dataLanguage.find(lang => lang.language_id === language.id)) {
          //     const translate = dataLanguage.find(lang => lang.language_id === language.id).translate;
          //     return translate;
          //   } else {
          //     return 'abc';
          //   }

          // }
        };
      });

      // G�n d?ng 3 h�ng ng�n ng? v�o bi?n columns
      this.columns = [
        { data: "word_id", title: "Word ID" },
        {
          data: "status",
          title: "Status",
          render: function (data, type, row) {
            const checked = row.status == 0 ? "checked" : "";
            return `<input type="checkbox" id="${row.word_id}" ${checked}/><label for="${row.word_id}">Toggle</label>`;
          },
          createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
            const checkbox = cell.querySelector('input[type="checkbox"]');
            checkbox.addEventListener(
              "click",
              function () {
                self.actionEditStatus(rowData);
              }.bind(this)
            );
          },
        },
        ...languageColumns, // �?ng 3 h�ng ng�n ng? v�o d�y
        {
          data: "word_id",
          title: "action",
          createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
            const app = createApp({
              render() {
                return h(
                  "a",
                  {
                    to: `/admin/word/default/${rowData.word_id}`,
                    class: "btn btn-all-add-edit",
                    onClick: () => {
                      router.push({
                        name: "Word Default",
                        params: { id: rowData.word_id },
                      });
                    },
                  },
                  "Default"
                );
              },
              data() {
                return {
                  rowData: rowData,
                };
              },
            });
            app.mount(cell);
          },
        },
      ];
    },
  },
};
</script>
<style lang="scss">
.modal {
  --bs-modal-width: none !important;
}
</style>