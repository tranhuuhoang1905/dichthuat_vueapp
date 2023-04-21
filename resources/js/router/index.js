import { createRouter, createWebHistory } from 'vue-router';
import Register from '../components/account/Register.vue';
import LoginIdentifier from '../components/account/LoginIdentifier.vue';
import LoginChallengeComponent from '../components/account/LoginChallengeComponent.vue';

import AdminParent from '../components/admin/AdminParent.vue';
import Dashboard from '../components/admin/Dashboard.vue';


import LanguageParent from '../components/admin/language/LanguageParent.vue';
import AllLanguages from '../components/admin/language/AllLanguages.vue';
import AddLanguage from '../components/admin/language/AddLanguage.vue';
import EditLanguage from '../components/admin/language/EditLanguage.vue';

import RoleParent from '../components/admin/role/RoleParent.vue';
import AllRoles from '../components/admin/role/AllRoles.vue';
import AddRole from '../components/admin/role/AddRole.vue';

import PermissionParent from '../components/admin/permission/PermissionParent.vue';
import AllPermissions from '../components/admin/permission/AllPermissions.vue';
import AddPermission from '../components/admin/permission/AddPermission.vue';

import WordParent from '../components/admin/word/WordParent.vue';
import AllWords from '../components/admin/word/AllWords.vue';
import AddWord from '../components/admin/word/AddWord.vue';

import ImportWordFromExcel from '../components/admin/word/ImportWordFromExcel.vue';
import TranslateWordFromExcel from '../components/admin/word/TranslateWordFromExcel.vue';
import EditWord from '../components/admin/word/EditWord.vue';
import WordDefault from '../components/admin/word/WordDefault.vue';

import Translate from '../components/translate/Translate.vue';
import ProfileUser from '../components/home/profile/Profile.vue';
import ChangePasswordProfileUser from '../components/home/profile/ChangePassword.vue';

import EditTranslate from '../components/translate/EditTranslate.vue';

import UserParent from '../components/admin/user/UserParent.vue';
import AllUser from '../components/admin/user/AllUser.vue';
import CreateNewUser from '../components/admin/user/CreateNewUser.vue';


import ProfileParent from '../components/admin/profile/ProfileParent.vue';
import Profile from '../components/admin/profile/Profile.vue';
import ChangePasswordProfile from '../components/admin/profile/ChangePassword.vue';


import LogImportExcelParent from '../components/admin/logImport/LogImportExcelParent.vue';
import LogImportExcel from '../components/admin/logImport/LogImport.vue'

const ErrorPage = {
    template: '<div>403 - Access denied</div>'
};
export const routes = [
    { name: 'home', path: '/', component: Translate },
    {
        name: 'Home Profile',
        path: '/profile',
        component: ProfileParent,
        meta: { requiresAuth: true },
        children: [
            {
                name: 'Home Profile User',
                path: 'profile-user',
                component: ProfileUser,
                meta: { requiresAuth: true }
            },
            {
                name: 'Home Change Password',
                path: 'change-pasword',
                component: ChangePasswordProfileUser,
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/admin',
        name: 'Dashboard',
        component: AdminParent,
        meta: { requiresAuth: true },
        children: [
            { name: 'Admin Dashboard', path: 'dashboard', component: Dashboard },
            {
                path: 'word',
                name: 'Word',
                component: WordParent,
                // meta: { permissions: ['Word Manager', 'Import excel', 'Translate file excel'] },
                children: [
                    {
                        name: 'All Word',
                        path: 'all',
                        component: AllWords,
                        meta: { permissions: ['Word Manager'] },
                        // props: (route) => ({ message: route.params.test }),
                    },
                    {
                        name: 'Add Word',
                        path: 'add',
                        component: AddWord,
                        meta: { permissions: ['Word Manager'] },
                    },

                    {
                        name: 'Import Word From Excel',
                        path: 'import-word-from-excel',
                        component: ImportWordFromExcel,
                        meta: { permissions: ['Import Excel'] },
                    },
                    {
                        name: 'Translate Word From Excel',
                        path: 'translate-word-from-excel',
                        component: TranslateWordFromExcel,
                        meta: { permissions: ['Translate File Excel'] },
                    },
                    {
                        name: 'Edit Word',
                        path: 'edit/:id',
                        component: EditWord,
                        meta: { permissions: ['Word Manager'] },
                    },
                    {
                        name: 'Word Default',
                        path: 'default/:id',
                        component: WordDefault,
                        meta: { permissions: ['Word Manager'] },
                    },
                    {
                        name: 'Edit Translate',
                        path: 'translate/edit/:id',
                        component: EditTranslate,
                        meta: { permissions: ['Word Manager'] },
                    }
                ]
            },
            {
                path: 'language',
                name: 'Language',
                component: LanguageParent,
                meta: { permissions: ['Language Manager'] },
                children: [
                    {
                        name: 'All Language',
                        path: 'all',
                        component: AllLanguages,
                    },
                    {
                        name: 'Add Language',
                        path: 'add',
                        component: AddLanguage,
                    },
                    {
                        name: 'Edit Language',
                        path: 'edit/:id',
                        component: EditLanguage,
                    }
                ]
            },
            {
                path: 'role',
                name: 'Role',
                component: RoleParent,
                meta: { permissions: ['Role Manager'] },
                children: [
                    {
                        name: 'All Roles',
                        path: 'all',
                        component: AllRoles,
                    },
                    {
                        name: 'Add Role',
                        path: 'add',
                        component: AddRole,
                    },
                ]
            },
            {
                path: 'permission',
                name: 'Permission',
                component: PermissionParent,
                meta: { permissions: ['Permission Manager'] },
                children: [
                    {
                        name: 'All Permissions',
                        path: 'all',
                        component: AllPermissions,
                        meta: { requiresAuth: true }
                    },
                    {
                        name: 'Add Permission',
                        path: 'add',
                        component: AddPermission,
                        meta: { requiresAuth: true, roles: ['admin'] }
                    },
                ]
            },
            {
                name: 'User Manager',
                path: 'user-manager',
                component: UserParent,
                // meta: { permissions: ['User Manager'] },
                children: [
                    {
                        name: 'All User',
                        path: '',
                        component: AllUser,
                    },
                    {
                        name: 'Create New User',
                        path: 'create-new-user',
                        component: CreateNewUser,
                    },
                ]
            },
            {
                name: 'Profile',
                path: 'profile',
                component: ProfileParent,
                children: [
                    {
                        name: 'Profile User',
                        path: 'profile-user',
                        component: Profile,
                    },
                    {
                        name: 'Change Password',
                        path: 'change-pasword',
                        component: ChangePasswordProfile,
                    }
                ]
            },
            {
                name: 'Log Import File Excel',
                path: 'log-import-excel',
                component: LogImportExcelParent,
                meta: { permissions: ['Log Import'] },
                children: [
                    {
                        name: 'All Log',
                        path: 'all',
                        component: LogImportExcel,
                        meta: { requiresAuth: true },
                        props: (route) => ({ message: route.params.test }),
                    },]
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: LoginIdentifier
    },
    {
        path: "/login-challenge/:email/:is_first_login",
        name: "Login Challenge",
        component: LoginChallengeComponent
    },

    {
        path: "/login-challenge/:email/:is_first_login",
        name: "Login Challenge",
        component: LoginChallengeComponent
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
import permissions from '../store/Modules/permissions';
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = store.getters.getLoginResponse.authenticated || JSON.parse(localStorage.getItem('loginResponse'))?.authenticated
    const roles = to.meta.roles
    const permissions = to.meta.permissions
    let authUser = undefined
    if (store.getters.getAuthUser.id !== undefined) {
        authUser = store.getters.getAuthUser;
    }
    authUser = JSON.parse(localStorage.getItem('authUser'))
    if (requiresAuth) {
        // kiểm tra xem người dùng đã đăng nhập hay chưa
        if (!isAuthenticated) {
            next('/login');
            return
        }
    }
    if (roles && roles.length > 0) {
        const userRoles = authUser.roles
        const hasAccess = userRoles.some(role => roles.includes(role.name));
        if (!hasAccess) {
            next('/error');
            return;
        }
    }
    if (permissions && permissions.length > 0) {
        const userRoles = authUser.roles
        let hasAccess = false;

        for (const role of userRoles) {
            if (role.permissions.some(permission => permissions.includes(permission.name))) {
                hasAccess = true;
                break;
            }
        }
        if (!hasAccess) {
            next('/error');
            return;
        }
    }
    next();

})
export default router