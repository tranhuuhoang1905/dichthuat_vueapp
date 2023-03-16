import { createRouter, createWebHistory } from 'vue-router';
import Admin from '../components/backend/Admin.vue';
// import Dashboard from '../components/dashboard/Dashboard.vue';
import Login from '../components/account/Login.vue';
import Register from '../components/account/Register.vue';

import AllLanguages from '../components/backend/language/AllLanguages.vue';
import AddLanguage from '../components/backend/language/AddLanguage.vue';
import EditLanguage from '../components/backend/language/EditLanguage.vue';
import AllWords from '../components/backend/word/AllWords.vue';
import AddWord from '../components/backend/word/AddWord.vue';
import EditWord from '../components/backend/word/EditWord.vue';
import WordDefault from '../components/backend/word/WordDefault.vue';
import Translate from '../components/backend/translate/Translate.vue';
import EditTranslate from '../components/backend/translate/EditTranslate.vue';
// import Login from '../../views/pages/account/login.vue';
export const routes = [
    {
        name: 'home',
        path: '/',
        component: Admin,
        meta: { requiresAuth: true } // thêm meta để kiểm tra xem route này cần đăng nhập hay không
    },
    {
        name: 'admin',
        path: '/admin',
        component: Admin,
    },
    { name: 'words', path: '/admin/words', component: AllWords },
    { name: 'add-word', path: '/admin/word/add', component: AddWord },
    { name: 'edit-word', path: '/admin/word/edit/:id', component: EditWord },
    { name: 'word-default', path: '/admin/word/default/:id', component: WordDefault },

    { name: 'translate', path: '/admin/translate', component: Translate },
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
    // }
    // ,
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: Login
    // }
];
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router