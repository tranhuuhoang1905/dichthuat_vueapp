<template>
  <div class="add-edit-language">
    <div class="row">
      <div class="row d-flex justify-content-center">
        <div class="card show border border-0">
        <div class="card-body">
          <h4 class="card-title text-center fs-4">Add Language</h4>
          <div class="col-md-12 d-flex flex-column align-items-center">
            <form @submit.prevent="addLanguage">
              <div class="form-group">
                <label for="language-name">Language name</label>
                <input
                  id="language-name"
                  type="text"
                  placeholder="Enter language name"
                  class="form-control"
                  v-model="language.name"
                />
              </div>
              <div class="form-group">
                <label for="language-description">Description</label>
                <textarea
                  id="language-description"
                  type="text"
                  placeholder="Enter description"
                  class="form-control"
                  rows="7"
                  v-model="language.description"
                ></textarea>
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-add-edit">
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
          // Nếu thành công, đưa người dùng đến trang danh sách các ngôn ngữ
          this.$router.push({ name: "languages" });
        })
        .catch((error) => {
          // Nếu không thành công, hiển thị thông báo lỗi
          console.log(error);
          alert("Failed to add language");
        });
    },
  },
};
</script>
<style lang="scss">

</style> 