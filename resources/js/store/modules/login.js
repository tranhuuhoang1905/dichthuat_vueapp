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
                            console.log(response);
                            if (response.status == 200) {
                                commit('mutateAuthUser', response.data);
                                sessionStorage.setItem(
                                    'authUser',
                                    JSON.stringify(response.data)
                                );
                                Router.push('/admin');
                            }
                        });
                    }
                });
        });
    },

    logout() {
        axios.get('/api/logout').then(() => {
            sessionStorage.removeItem('loginResponse');
            sessionStorage.removeItem('authUser');
            Router.push('/');
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
                    // commit('mutateRegisterResponse', response.data);
                    // sessionStorage.setItem(
                    //     'registerResponse',
                    //     JSON.stringify(response.data)
                    // );
                    commit('mutateLoginResponse', response.data);
                    sessionStorage.setItem(
                        'loginResponse',
                        JSON.stringify(response.data)
                    );
                    console.log('getters.getLoginResponse.response_type');
                    console.log(getters.getLoginResponse.response_type);
                    if (getters.getLoginResponse.response_type == 'success') {
                        axios.get('/api/user').then(response => {
                            console.log(response);
                            if (response.status == 200) {
                                commit('mutateAuthUser', response.data);
                                sessionStorage.setItem(
                                    'authUser',
                                    JSON.stringify(response.data)
                                );
                                Router.push('/admin');
                            }
                        });
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
