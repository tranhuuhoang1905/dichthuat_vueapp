<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Email đăng nhập</th>
                    <th>Chức vụ</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                        <button @click="editUser(user)" class="btn btn-primary btn-sm">Sửa</button>
                        <button @click="deleteUser(user)" class="btn btn-danger btn-sm">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="showUserForm = true" class="btn btn-success">Thêm mới</button>
        <div v-if="showUserForm">
            <h2>Thêm mới người dùng</h2>
            <form @submit.prevent="addUser">
                <div class="form-group">
                    <label for="name">Tên</label>
                    <input type="text" id="name" v-model="newUser.name" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="email">Email đăng nhập</label>
                    <input type="email" id="email" v-model="newUser.email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="role">Chức vụ</label>
                    <input type="text" id="role" v-model="newUser.role" class="form-control" required>
                </div>
                <button class="btn btn-success">Thêm mới</button>
                <button type="button" @click="showUserForm = false" class="btn btn-secondary">Hủy</button>
            </form>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            users: [
                { id: 1, name: 'John Doe', email: 'johndoe@gmail.com', role: 'Quản lý' },
                { id: 2, name: 'Jane Smith', email: 'janesmith@yahoo.com', role: 'Nhân viên' },
                { id: 3, name: 'Peter Parker', email: 'peterparker@hotmail.com', role: 'Nhân viên kinh doanh' }
            ],
            showUserForm: false, // biến đánh dấu hiển thị form thêm mới người dùng
            newUser: { // đối tượng người dùng mới
                name: '',
                email: '',
                role: ''
            }
        }
    },

    created() {
        // this.axios
        //     .get('/api/allusers')
        //     .then((response) => {
        //         // this.users = response.data;
        //         console.log(response.data);
        //     });
    },
    methods: {
        // thêm mới người dùng
        addUser() {
            // thực hiện các xử lý để thêm mới người dùng vào danh sách
            // sau khi thêm mới xong, reset trạng thái của biến newUser và đóng form
            this.newUser = {
                name: '',
                email: '',
                role: ''
            }
            this.showUserForm = false
        },
        // sửa thông tin người dùng
        editUser(user) {
            // thực hiện các xử lý để sửa thông tin người dùng
        },
        // xóa người dùng
        deleteUser(user) {
            // thực hiện các xử lý để xóa người dùng khỏi danh sách
        }
    }
}
</script>