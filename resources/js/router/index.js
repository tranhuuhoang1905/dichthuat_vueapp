import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/admin/Dashboard.vue';
import HomePage from '../components/admin/HomePage.vue';
// import Login from '../components/account/Login.vue';
// import Register from '../components/account/Register.vue';

import AllLanguages from '../components/admin/language/AllLanguages.vue';
import AddLanguage from '../components/admin/language/AddLanguage.vue';
import EditLanguage from '../components/admin/language/EditLanguage.vue';
import AllWords from '../components/admin/word/AllWords.vue';
import AddWord from '../components/admin/word/AddWord.vue';
import EditWord from '../components/admin/word/EditWord.vue';
import WordDefault from '../components/admin/word/WordDefault.vue';
import Translate from '../components/admin/translate/Translate.vue';
import EditTranslate from '../components/admin/translate/EditTranslate.vue';
import Login from '../components/account/Login.vue';
export const routes = [
    {
        name: 'home', path: '/', component: Translate, meta: { requiresAuth: true } // thêm meta để kiểm tra xem route này cần đăng nhập hay không
    },
    { name: 'admin', path: '/admin', component: Dashboard, },
    { name: 'words', path: '/admin/words', component: AllWords },
    { name: 'add-word', path: '/admin/word/add', component: AddWord },
    { name: 'edit-word', path: '/admin/word/edit/:id', component: EditWord },
    { name: 'word-default', path: '/admin/word/default/:id', component: WordDefault },
    { name: 'edit-translate', path: '/admin/translate/edit/:id', component: EditTranslate },

    { name: 'languages', path: '/admin/languages', component: AllLanguages },
    { name: 'add-language', path: '/admin/language/add', component: AddLanguage },
    { name: 'edit-language', path: '/admin/language/edit/:id', component: EditLanguage },

    // { name: 'edit-translate', path: '/admin/translate/edit/:id', component: EditTranslate },
    // ,
    // {
    //     path: '/register',
    //     name: 'register',
    //     component: Register
    // },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router