<template>
    <div class="container-xl user-namager">
        <h3 class="text-center">User Manager</h3>
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
                    <td>
                        <p v-for="role in user.roles" :key="role.id">{{ role.name }}</p>
                    </td>
                    <td>
                        <router-link :to="{ name: 'change-role-user', params: { id: user.id } }"
                            class="btn btn-primary">Change role
                        </router-link>
                        <router-link :to="{ name: 'change-password-user', params: { id: user.id } }"
                            class="btn btn-primary">Change password
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <router-link to="/admin/user-manager/create-new-user">Create new user</router-link>
        <div>
            <a href="/api/export" download>Download Users Excel</a>
        </div>

        <div>
            <form @submit.prevent="handleFileUpload">
                <input type="file" ref="fileInput">
                <button type="submit">Upload</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import { saveAs } from 'file-saver';
export default {
    data() {
        return {
            users: [
                // { id: 1, name: 'John Doe', email: 'johndoe@gmail.com', role: 'Quản lý' },
                // { id: 2, name: 'Jane Smith', email: 'janesmith@yahoo.com', role: 'Nhân viên' },
                // { id: 3, name: 'Peter Parker', email: 'peterparker@hotmail.com', role: 'Nhân viên kinh doanh' }
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
        this.axios
            .get('/api/user/allusers')
            .then((response) => {
                this.users = response.data;
                console.log(response.data);
            });
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
        },

        //test import file excel
        handleFileUpload() {
            const fileInput = this.$refs.fileInput;
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append('file', file);
            axios.post('/api/upload', formData, {
                responseType: 'blob'
            })
                .then(response => {
                    const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
                    saveAs(blob, 'usersedit.xlsx');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>