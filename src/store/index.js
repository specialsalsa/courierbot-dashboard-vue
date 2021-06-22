import Vue from "vue";
import Vuex from "vuex";
import { usersConfig } from "../config/user";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        a: 0,
        users: [],
        addUserForm: {
            username: null,
            kicked: null,
            id_user_type: null
        },
        addUserStatus: null,
        selectedUserID: null,
        status: null
    },
    // where yo umutate/change the value of the state
    mutations: {
        // method to update the users array
        SET_USERS(state, payload) {
            state.users = payload.users;
        },
        SET_SELECTED_USER_ID(state, payload) {
            state.selectedUserID = payload.id;
        },
        SET_ADD_USER_STATUS(state, payload) {
            state.addUserStatus = payload.status;
            console.log(state.addUserStatus);
        },
        SET_ADD_USER_FORM(state, payload) {
            state.addUserForm.username = payload.username;
            state.addUserForm.kicked = payload.kicked;
            state.addUserForm.id_user_type = payload.id_user_type;
        }
    },
    actions: {
        async setUsers({ commit }) {
            commit("SET_USERS", await usersConfig.getUsers());
        },
        async addUser({ commit, state }) {
            commit(
                "SET_ADD_USER_STATUS",
                await usersConfig.addUser(
                    state.addUserForm.username,
                    state.addUserForm.kicked,
                    state.addUserForm.id_user_type
                )
            );
        }
    },
    getters: {
        // get variables from the state
        getUsers: state => state.users,
        getSelectedUserByID: state => id =>
            state.users.find(user => user.discord_user_id === id),
        getSelectedUserID: state => state.selectedUserID
    },
    plugins: [createPersistedState()],
    modules: {}
});
