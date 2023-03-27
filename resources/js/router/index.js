import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/admin/Dashboard.vue';
import HomePage from '../components/admin/HomePage.vue';
import Register from '../components/account/Register.vue';

import AllLanguages from '../components/admin/language/AllLanguages.vue';
import AddLanguage from '../components/admin/language/AddLanguage.vue';
import EditLanguage from '../components/admin/language/EditLanguage.vue';

import AllWords from '../components/admin/word/AllWords.vue';
import AddWord from '../components/admin/word/AddWord.vue';
import ImportWordFromExcel from '../components/admin/word/ImportWordFromExcel.vue';
import TranslateWordFromExcel from '../components/admin/word/TranslateWordFromExcel.vue';
import EditWord from '../components/admin/word/EditWord.vue';
import WordDefault from '../components/admin/word/WordDefault.vue';

import Translate from '../components/translate/Translate.vue';
import EditTranslate from '../components/translate/EditTranslate.vue';

import UserManager from '../components/admin/user/UserManager.vue';
import CreateNewUser from '../components/admin/user/CreateNewUser.vue';
import ChangeRoleUser from '../components/admin/user/ChangeRoleUser.vue';
import ChangePasswordUser from '../components/admin/user/ChangePasswordUser.vue';

import Profile from '../components/admin/profile/Profile.vue'
import ChangePasswordProfile from '../components/admin/profile/ChangePassword.vue'

import Login from '../components/account/Login.vue';
export const routes = [
    { name: 'home', path: '/', component: Translate },
    { name: 'admin', path: '/admin', component: Dashboard, meta: { requiresAuth: true } },
    { name: 'all-word', path: '/admin/word/all', component: AllWords, meta: { requiresAuth: true } },
    { name: 'add-word', path: '/admin/word/add', component: AddWord, meta: { requiresAuth: true } },
    { name: 'import-word-from-excel', path: '/admin/word/import-word-from-excel', component: ImportWordFromExcel, meta: { requiresAuth: true } },
    { name: 'translate-word-from-excel', path: '/admin/word/translate-word-from-excel', component: TranslateWordFromExcel, meta: { requiresAuth: true } },
    { name: 'edit-word', path: '/admin/word/edit/:id', component: EditWord, meta: { requiresAuth: true } },
    { name: 'word-default', path: '/admin/word/default/:id', component: WordDefault, meta: { requiresAuth: true } },
    { name: 'edit-translate', path: '/admin/translate/edit/:id', component: EditTranslate, meta: { requiresAuth: true } },

    { name: 'all-language', path: '/admin/language/all', component: AllLanguages, meta: { requiresAuth: true } },
    { name: 'add-language', path: '/admin/language/add', component: AddLanguage, meta: { requiresAuth: true } },
    { name: 'edit-language', path: '/admin/language/edit/:id', component: EditLanguage, meta: { requiresAuth: true } },
    { name: 'user-manager', path: '/admin/user-manager', component: UserManager, meta: { requiresAuth: true } },
    { name: 'create-new-user', path: '/admin/user-manager/create-new-user', component: CreateNewUser, meta: { requiresAuth: true } },
    { name: 'change-role-user', path: '/admin/user-manager/change-role-user/:id', component: ChangeRoleUser, meta: { requiresAuth: true } },
    { name: 'change-password-user', path: '/admin/user-manager/change-pasword-user/:id', component: ChangePasswordUser, meta: { requiresAuth: true } },

    { name: 'profile', path: '/admin/profile', component: Profile, meta: { requiresAuth: true } },
    { name: 'changepassword', path: '/admin/profile/change-password', component: ChangePasswordProfile, meta: { requiresAuth: true } },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },

];
const router = createRouter({
    history: createWebHistory(),
    routes
})
import { store } from '../store/store';
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = store.getters.getLoginResponse.authenticated || JSON.parse(sessionStorage.getItem('loginResponse'))?.authenticated

    if (requiresAuth && !isAuthenticated) {
        next('/login') // Redirect to login page if user is not authenticated
    } else {
        next() // Proceed to the requested page
    }
})
export default router