import Vue from "vue";
import Vuex from "vuex";
import { usersConfig } from "../config/user";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        a: 0,
        users: [],
        serverInfo: {
            memberCount: null,
            botCount: null
        },
        addUserForm: {
            username: null,
            kicked: null,
            id_user_type: null
        },
        addUserStatus: null,
        selectedUserID: null,
        status: null,
        updateUserForm: {
            username: null,
            kicked: null
        },
        updateUserStatus: null,
        deleteUserStatus: null,
        addedUserModal: null,
        prefixInput: null,
        prefix: null,
        serverID: 1
    },
    // where you mutate/change the value of the state
    mutations: {
        // method to update the users array in the state object
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
        },
        SET_UPDATE_USER_FORM(state, payload) {
            state.updateUserForm.username = payload.username;
            state.updateUserForm.kicked = payload.kicked;
        },
        SET_UPDATE_USER_STATUS(state, payload) {
            state.updateUserStatus = payload.status;
        },
        SET_DELETE_USER_STATUS(state, payload) {
            state.deleteUserStatus = payload.status;
        },
        SET_ADDED_USER_MODAL(state, payload) {
            state.addedUserModal = payload.addedUserModal;
        },
        SET_PREFIX_INPUT(state, payload) {
            state.prefixInput = payload.prefixInput;
        },
        SET_PREFIX(state, payload) {
            state.prefix = payload.config[0].command_prefix;
        }
    },
    actions: {
        // actions are asynchronous functions that call the API
        // connected to the API
        async setUsers({ commit }) {
            // function, payload (what you want to send)
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
        },

        async updateUser({ commit, state }) {
            commit(
                "SET_UPDATE_USER_STATUS",
                await usersConfig.updateUser(
                    state.selectedUserID,
                    state.updateUserForm.username,
                    state.updateUserForm.kicked
                )
            );
        },
        // destructuring object with commit and state
        async deleteUser({ commit, state }) {
            commit(
                "SET_DELETE_USER_STATUS",
                await usersConfig.deleteUser(state.selectedUserID)
            );
        },
        async updatePrefix({ commit, state }) {
            commit(
                "SET_PREFIX_INPUT",
                await usersConfig.updatePrefix(state.prefixInput)
            );
        },
        async updatePrefixConfig({ commit }) {
            commit("SET_PREFIX", await usersConfig.getPrefix());
        }
    },
    getters: {
        // get variables from the state
        getUsers: state => state.users,
        getSelectedUserByID: state => id =>
            state.users.find(user => user.user_id === id),
        getSelectedUserID: state => state.selectedUserID,
        getAddedUsername: state => state.addUserForm.username,
        getAddedUserModal: state => state.addedUserModal,
        getPrefix: state => state.prefix
    },
    plugins: [createPersistedState()],
    modules: {}
});
