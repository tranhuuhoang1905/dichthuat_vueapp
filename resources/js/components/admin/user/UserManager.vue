<template>
    <div class="user_manager">
    <div class="row position-relative">
      <div class="col-12">
          <div class="card show border border-0">
            <router-link :to="{name:'create-new-user'}" class="btn btn-all-add-edit my-3 mx-3 position-absolute ">Create new user</router-link>
          <div class="card-body">
            <h4 class="card-title text-center fs-4 my-3">User Manager</h4>
           
              <table id="datatable"
              class="table table-bordered dt-responsive nowrap my-3">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Email đăng nhập</th>
                    <th>Chức vụ</th>
                    <th>Actions</th>
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
                    <td class="d-flex justify-content-evenly">
                        <router-link :to="{ name: 'change-role-user', params: { id: user.id } }"
                            class="btn btn-all-add-edit">Change role
                        </router-link>
                        <router-link :to="{ name: 'change-password-user', params: { id: user.id } }"
                            class="btn btn-all-add-edit">Change password
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
       
    </div>
    </div>
    </div>
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