<template>
    <div>
        <h3 class="text-center">All Languages</h3><br />
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="language in languages" :key="language.id">
                    <td>{{ language.id }}</td>
                    <td>{{ language.name }}</td>
                    <td>{{ language.description }}</td>
                    <td>{{ language.status }}</td>
                    <td>{{ language.created_at }}</td>
                    <td>{{ language.updated_at }}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <router-link :to="{ name: 'edit-language', params: { id: language.id } }"
                                class="btn btn-primary">Edit</router-link>
                            <button class="btn btn-danger" @click="deleteLanguage(language.id)">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            languages: [],
            roles: []
        }
    },
    created() {
        this.axios
            .get('/api/languages')
            .then(response => {
                this.languages = response.data;
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },
    methods: {
        deleteLanguage(id) {
            this.axios
                .delete(`/api/language/delete/${id}`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    let i = this.languages.findIndex(language => language.id === id);
                    this.languages.splice(i, 1);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>
  