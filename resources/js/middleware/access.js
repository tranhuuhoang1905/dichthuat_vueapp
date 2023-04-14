import { store } from '../store/store';
export function checkRolesAccess(roles) {
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
    console.log("check roles user:", userRoles);
    return userRoles.some((role) => roles.includes(role.name));
}

export function checkPermissionAccess(permissions) {
    if (permissions.length === 0) {
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
    console.log("check roles user:", userRoles);
    let hasAccess = false;

    for (const role of userRoles) {
        if (role.permissions.some(permission => permissions.includes(permission.name))) {
            hasAccess = true;
            break;
        }
    }
    return hasAccess;
}
