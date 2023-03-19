<template>
    <div class="add-language">
        <h3 class="text-center">Add Language</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="addLanguage">
                    <div class="form-group">
                        <label for="language-name">Language name</label>
                        <input id="language-name" type="text" placeholder="Enter language name" class="form-control"
                            v-model="language.name" />
                    </div>
                    <div class="form-group">
                        <label for="language-description">Description</label>
                        <input id="language-description" type="text" placeholder="Enter description" class="form-control"
                            v-model="language.description" />
                    </div>
                    <button type="submit" class="btn btn-primary">Add Language</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            language: {}
        };
    },
    methods: {
        addLanguage() {
            // Gọi API để thêm ngôn ngữ mới
            this.axios
                .post("/api/language/add", this.language)
                .then(response => {
                    // Nếu thành công, đưa người dùng đến trang danh sách các ngôn ngữ
                    this.$router.push({ name: "languages" });
                })
                .catch(error => {
                    // Nếu không thành công, hiển thị thông báo lỗi
                    console.log(error);
                    alert("Failed to add language");
                });
        }
    }
};
</script>
<style scoped>
.add-language {
    margin: 20px;
}
</style> 