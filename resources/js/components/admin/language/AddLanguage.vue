<template>
  <div class="add_language">
    <div class="row">
      <div class="row d-flex justify-content-center">
        <div class="card show border border-0">
          <div class="card-body">
            <h4 class="card-title text-center fs-4">Add Language</h4>
            <div class="col-md-12 d-flex flex-column align-items-center">
              <form @submit.prevent="addLanguage">
                <div class="form-group">
                  <label for="language-name">Language name</label>
                  <input id="language-name" type="text" placeholder="Enter language name" class="form-control"
                    v-model="language.name" required />
                </div>
                <div class="form-group">
                  <label for="language-name">Key Language</label>
                  <input id="language-name" type="text" placeholder="Enter key language" class="form-control"
                    v-model="language.iso_code" required />
                </div>
                <div class="form-group">
                  <label for="language-description">Description</label>
                  <textarea id="language-description" type="text" placeholder="Enter description" class="form-control"
                    cols="70" rows="7" v-model="language.description" required></textarea>
                </div>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-all-add-edit">
                    Add Language
                  </button>
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

export default {
  data() {
    return {
      language: {},
    };
  },
  methods: {
    addLanguage() {
      // Gọi API để thêm ngôn ngữ mới
      this.axios
        .post("/api/language/add", this.language)
        .then((response) => {
          if (response.data.status === 200) {
            this.$swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Add language ${this.language.name} success`,
              showConfirmButton: false,
              timer: this.$config.notificationTimer ?? 1000
            })
            this.language = {};
          }
        })
        .catch((error) => {
          // Nếu không thành công, hiển thị thông báo lỗi
          console.log(error);
          // alert(`Error ${error.response.status}: ${error.response.data.message}`);
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error ${error.response.status}: ${error.response.data.message}`,
            // footer: '<a href="">Why do I have this issue?</a>'
          })
        });
    },
  },
};
</script>
<style lang="scss"></style> 