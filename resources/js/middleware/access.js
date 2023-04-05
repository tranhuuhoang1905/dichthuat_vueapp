import { store } from '../store/store';

export default function checkAccess(roles) {
    if (roles.length === 0) {
        return true;
    }
    let authUser = undefined;
    if (store.getters.getAuthUser.id !== undefined) {
        authUser = store.getters.getAuthUser;
    } else {
        authUser = JSON.parse(localStorage.getItem('authUser'));
    }
    if (!authUser || authUser.length === 0) {
        return false;
    }
    const userRoles = authUser.roles;
    return userRoles.some((role) => roles.includes(role.name));
}