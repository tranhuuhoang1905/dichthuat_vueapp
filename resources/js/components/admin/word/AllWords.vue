<template>
  <div class="all_word">
    <div class="row">
      <div class="col-12">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">All Words</h4>
            <div class="">
              <table ref="myTable" class="table table-bordered table-striped table-hover display nowrap">
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- The Modal -->
  <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Modal Heading</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          Modal body..
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>

      </div>
    </div>
  </div>
  <button style="display: none;" ref="myModalBtn" type="button" class="btn btn-primary" data-toggle="modal"
    data-target="#myModal">
    Open modal
  </button>
</template>
 
<script>
import { exit } from "process";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import $ from "jquery";
import { createApp, h } from "vue";
import router from '@resources/js/router/index';
DataTable.use(DataTablesCore);
export default {
  data() {
    return {
      words: [],
      words_test: [],
      languages: [],
    };
  },
  mounted() { },
  created() {
    this.fetchData();
  },
  methods: {
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
      // T?o d?ng 3 hàng ngôn ng?
      const languageColumns = this.languages.map(language => {
        return {
          data: "word_id",
          title: language.name,
          createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
            const app = createApp({
              render() {
                const dataLanguage = JSON.parse(`[${rowData.data}]`);
                if (dataLanguage.find(lang => lang.language_id === language.id)) {
                  const translate = dataLanguage.find(lang => lang.language_id === language.id).translate;
                  return h(
                    "button",
                    {
                      to: `/admin/word/default/${rowData.word_id}`,
                      class: "",
                      onClick: () => {
                        // router.push({
                        //   name: "Word Default",
                        //   params: { id: rowData.word_id },
                        // });
                        self.$refs.myModalBtn.click();
                      },
                    },
                    translate
                  );
                } else {
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
                    "abc"
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

      // Gán d?ng 3 hàng ngôn ng? vào bi?n columns
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
            checkbox.addEventListener('click', function () {
              self.actionEditStatus(rowData);
            }.bind(this));
          },
        },
        ...languageColumns, // Ð?ng 3 hàng ngôn ng? vào dây
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