import Vue from "vue";
import Vuex from "vuex";
import { usersConfig } from "../config/user";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: []
    },
    mutations: {
        SET_USERS(state, payload) {
            state.users = payload.users;
        }
    },
    actions: {
        async setUsers({ commit }) {
            commit("SET_USERS", await usersConfig.getUsers());
        }
    },
    getters: {
        getUsers: state => state.users
    },
    modules: {}
});
