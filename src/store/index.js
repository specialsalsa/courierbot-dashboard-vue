import Vue from "vue";
import Vuex from "vuex";
import { usersConfig } from "../config/user";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        a: 0,
        users: [],
        selectedUserID: null
    },
    mutations: {
        SET_USERS(state, payload) {
            state.users = payload.users;
        },
        SET_SELECTED_USER_ID(state, payload) {
            state.selectedUserID = payload.id;
        }
    },
    actions: {
        async setUsers({ commit }) {
            commit("SET_USERS", await usersConfig.getUsers());
        }
    },
    getters: {
        getUsers: state => state.users,
        getSelectedUserByID: state => id =>
            state.users.find(user => user.discord_user_id === id),
        getSelectedUserID: state => state.selectedUserID
    },
    plugins: [createPersistedState()],
    modules: {}
});
