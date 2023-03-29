import Router from '../../router';

const state = {
    loginResponse: {},
    authUser: {},
};

const getters = {
    getLoginResponse: state => state.loginResponse,
    // getRegisterResponse: state => state.registerResponse,
    getAuthUser: state => state.authUser,
};

const actions = {
    login({ commit, getters }, loginData) {
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios
                .post('/api/login', {
                    email: loginData.email,
                    password: loginData.password,
                })
                .then(response => {
                    commit('mutateLoginResponse', response.data);
                    sessionStorage.setItem(
                        'loginResponse',
                        JSON.stringify(response.data)
                    );
                    if (getters.getLoginResponse.response_type == 'success') {
                        axios.get('/api/user').then(response => {
                            if (response.data.status === 200) {
                                commit('mutateAuthUser', response.data.data.user);
                                sessionStorage.setItem(
                                    'authUser',
                                    JSON.stringify(response.data.data.user)
                                );
                                if (getters.getAuthUser.roles.some(role => role.name === "admin")) {
                                    // Chuyển hướng đến trang admin
                                    // Router.push('/admin').then(() => {
                                    //     location.reload();
                                    // });
                                    window.location.replace('/admin');
                                } else {
                                    // Chuyển hướng đến trang chính
                                    Router.push('/');
                                }
                                // Router.push('/admin');
                            }
                        });
                    } else {
                        alert(getters.getLoginResponse.response_data[0]);
                    }
                });
        });
    },

    logout() {
        axios.get('/api/logout').then(() => {
            sessionStorage.removeItem('loginResponse');
            sessionStorage.removeItem('authUser');
            Router.push('/login');
        });
    },
    registeruser({ commit, getters }, registerData) {
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios
                .post('/api/register', {
                    username: registerData.username,
                    email: registerData.email,
                    password: registerData.password,
                    repassword: registerData.repassword,
                })
                .then(response => {
                    commit('mutateLoginResponse', response.data);
                    sessionStorage.setItem(
                        'loginResponse',
                        JSON.stringify(response.data)
                    );
                    console.log('getters.getLoginResponse.response_type');
                    console.log(getters.getLoginResponse.response_type);
                    if (getters.getLoginResponse.response_type == 'success') {
                        axios.get('/api/user').then(response => {
                            if (response.data.status === 200) {
                                commit('mutateAuthUser', response.data.data.user);
                                sessionStorage.setItem(
                                    'authUser',
                                    JSON.stringify(response.data.data.user)
                                );
                                window.location.replace('/admin');
                            }
                        });
                    }
                });
        });
    },

    storeUpdateUser({ commit, getters }) {
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios.get('/api/user').then(response => {

                if (response.data.status === 200) {
                    commit('mutateAuthUser', response.data.data.user);
                    sessionStorage.setItem(
                        'authUser',
                        JSON.stringify(response.data.data.user)
                    );
                }
            });
        });
    }
};

const mutations = {
    mutateLoginResponse: (state, payload) => (state.loginResponse = payload),
    // mutateRegisterResponse: (state, payload) => (state.registerResponse = payload),
    mutateAuthUser: (state, payload) => (state.authUser = payload),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
