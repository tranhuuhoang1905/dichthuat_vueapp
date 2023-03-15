<template>
    <div>
        <h3 class="text-center">All Words</h3><br />
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="word in words" :key="word.id">
                    <td>{{ word.id }}</td>
                    <td>{{ word.word }}</td>
                    <td>{{ word.description }}</td>
                    <td>{{ word.status }}</td>
                    <td>{{ word.created_at }}</td>
                    <td>{{ word.updated_at }}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <!-- <router-link :to="{ name: 'word-default', params: { id: word.id } }"
                                class="btn btn-primary">default
                            </router-link>
                            <router-link :to="{ name: 'edit-word', params: { id: word.id } }" class="btn btn-primary">Edit
                            </router-link> -->
                            <button class="btn btn-danger" @click="deleteWord(word.id)">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
 
<script>
import { exit } from 'process';

export default {
    data() {
        return {
            words: [],
            roles: []
        }
    },
    created() {
        //console.log(this.axios.get('/api/words'));
        // exit();
        // const userJson = localStorage.getItem('user');
        // const user = JSON.parse(userJson);
        console.log(this.authUser)
        this.axios
            .post('/api/words')
            .then(response => {
                this.words = response.data;
                console.log(response.data);
            });
        console.log(this.words);
    },
    methods: {
        deleteWord(id) {
            this.axios.delete(`/api/word/delete/${id}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    let i = this.words.map(item => item.id).indexOf(id); // find index of your object
                    this.words.splice(i, 1)
                });
        }
    }
}
</script>