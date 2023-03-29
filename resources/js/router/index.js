import { createRouter, createWebHistory } from 'vue-router';
import Register from '../components/account/Register.vue';

import AdminParent from '../components/admin/AdminParent.vue';
import Dashboard from '../components/admin/Dashboard.vue';


import LanguageParent from '../components/admin/language/LanguageParent.vue';
import AllLanguages from '../components/admin/language/AllLanguages.vue';
import AddLanguage from '../components/admin/language/AddLanguage.vue';
import EditLanguage from '../components/admin/language/EditLanguage.vue';

import WordParent from '../components/admin/word/WordParent.vue';
import AllWords from '../components/admin/word/AllWords.vue';
import AddWord from '../components/admin/word/AddWord.vue';
import ImportWordFromExcel from '../components/admin/word/ImportWordFromExcel.vue';
import TranslateWordFromExcel from '../components/admin/word/TranslateWordFromExcel.vue';
import EditWord from '../components/admin/word/EditWord.vue';
import WordDefault from '../components/admin/word/WordDefault.vue';

import Translate from '../components/translate/Translate.vue';
import EditTranslate from '../components/translate/EditTranslate.vue';

import UserParent from '../components/admin/user/UserParent.vue';
import AllUser from '../components/admin/user/AllUser.vue';
import CreateNewUser from '../components/admin/user/CreateNewUser.vue';
import ChangeRoleUser from '../components/admin/user/ChangeRoleUser.vue';
import ChangePasswordUser from '../components/admin/user/ChangePasswordUser.vue';


import ProfileParent from '../components/admin/profile/ProfileParent.vue';
import Profile from '../components/admin/profile/Profile.vue'
import ChangePasswordProfile from '../components/admin/profile/ChangePassword.vue'
import Login from '../components/account/Login.vue';
const ErrorPage = {
    template: '<div>403 - Access denied</div>'
};
export const routes = [
    { name: 'home', path: '/', component: Translate },
    {
        path: '/admin',
        name: 'Dashboard',
        component: AdminParent,
        // meta: { requiresAuth: true },
        meta: { requiresAuth: true, roles: ['admin', 'leader'] },
        children: [
            { name: 'Admin Dashboard', path: 'dashboard', component: Dashboard },
            {
                path: 'word',
                name: 'Word',
                component: WordParent,
                children: [
                    {
                        name: 'All Word',
                        path: 'all',
                        component: AllWords,
                        meta: { requiresAuth: true },
                        props: (route) => ({ message: route.params.test }),
                    },
                    {
                        name: 'Add Word',
                        path: 'add',
                        component: AddWord,
                        meta: { requiresAuth: true }
                    },
                    {
                        name: 'Import Word From Excel',
                        path: 'import-word-from-excel',
                        component: ImportWordFromExcel,
                        meta: {
                            requiresAuth: true, roles: ['admin']
                        }
                    },
                    {
                        name: 'Translate Word From Excel',
                        path: 'translate-word-from-excel',
                        component: TranslateWordFromExcel,
                        meta: { requiresAuth: true }
                    },
                    {
                        name: 'Edit Word',
                        path: 'edit/:id',
                        component: EditWord,
                        meta: { requiresAuth: true }
                    },
                    {
                        name: 'Word Default',
                        path: 'default/:id',
                        component: WordDefault,
                        meta: { requiresAuth: true }
                    },
                    {
                        name: 'Edit Translate',
                        path: 'translate/edit/:id',
                        component: EditTranslate,
                        meta: { requiresAuth: true }
                    }
                ]
            },
            {
                path: 'language',
                name: 'Language',
                component: LanguageParent,
                children: [
                    {
                        name: 'All Language',
                        path: 'all',
                        component: AllLanguages,
                        meta: { requiresAuth: true }
                    },
                    {
                        name: 'Add Language',
                        path: 'add',
                        component: AddLanguage,
                        meta: { requiresAuth: true, roles: ['admin'] }
                    },
                    {
                        name: 'Edit Language',
                        path: 'edit/:id',
                        component: EditLanguage,
                        meta: { requiresAuth: true, roles: ['admin'] }
                    }
                ]
            },
            {
                name: 'User Manager',
                path: 'user-manager',
                component: UserParent,
                meta: { requiresAuth: true, roles: ['admin', 'leader'] }, // chỉ cho phép admin truy cập
                children: [
                    {
                        name: 'All User',
                        path: '',
                        component: AllUser,
                        meta: { requiresAuth: true, roles: ['admin', 'leader'] }
                    },
                    {
                        name: 'Create New User',
                        path: 'create-new-user',
                        component: CreateNewUser,
                        meta: { requiresAuth: true, roles: ['admin'] }
                    },
                    {
                        name: 'Change Role User',
                        path: 'change-role-user/:id',
                        component: ChangeRoleUser,
                        meta: { requiresAuth: true, roles: ['admin'] }
                    },
                    {
                        name: 'Change Password User',
                        path: 'change-pasword-user/:id',
                        component: ChangePasswordUser,
                        meta: { requiresAuth: true, roles: ['admin'] }
                    }
                ]
            },
            {
                name: 'Profile',
                path: 'profile',
                component: ProfileParent,
                meta: { requiresAuth: true },
                children: [
                    {
                        name: 'Profile User',
                        path: 'profile-user',
                        component: Profile,
                        meta: { requiresAuth: true }
                    },
                    {
                        name: 'Change Password',
                        path: 'change-pasword',
                        component: ChangePasswordProfile,
                        meta: { requiresAuth: true }
                    }
                ]
            }
        ]
    },
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
    {
        path: '/error',
        name: 'error',
        component: ErrorPage
    }

];
const router = createRouter({
    history: createWebHistory(),
    routes
})
import { store } from '../store/store';
// router.beforeEach((to, from, next) => {
//     const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//     const isAuthenticated = store.getters.getLoginResponse.authenticated || JSON.parse(sessionStorage.getItem('loginResponse'))?.authenticated

//     if (requiresAuth && !isAuthenticated) {
//         next('/login') // Redirect to login page if user is not authenticated
//     } else {
//         next() // Proceed to the requested page
//     }
// })

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = store.getters.getLoginResponse.authenticated || JSON.parse(sessionStorage.getItem('loginResponse'))?.authenticated
    const roles = to.meta.roles
    let authUser = undefined
    if (store.getters.getAuthUser.id !== undefined) {
        authUser = store.getters.getAuthUser;
    }
    authUser = JSON.parse(sessionStorage.getItem('authUser'))
    if (requiresAuth) {
        // kiểm tra xem người dùng đã đăng nhập hay chưa
        if (!isAuthenticated) {
            next('/login')
        } else {
            // kiểm tra vai trò của người dùng
            if (roles && roles.length > 0) {
                const userRoles = authUser.roles
                console.log("--------------");
                console.log(authUser.roles);
                const hasAccess = userRoles.some(role => roles.includes(role.name));
                if (hasAccess) {
                    next()
                } else {
                    next('/error');
                    // alert("You do not have permission to access this page."); // hiển thị trang lỗi khi không có quyền truy cập
                }
            } else {
                next()
            }
        }
    } else {
        next()
    }
})
export default router