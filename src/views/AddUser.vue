<template>
    <div class="addUser">
        <div class="addUserForm">
            <form @submit.prevent="addUser()">
                <label for="usernameTxt">Username</label>
                <br />
                <input
                    type="text"
                    name=""
                    id="usernameTxt"
                    v-model="inputs.usernameTxt"
                />
                <br />
                <br />
                <label for="kickedTxt">Kicked</label>
                <br />
                <input
                    type="number"
                    name=""
                    id="kickedTxt"
                    v-model="inputs.kickedTxt"
                    min="0"
                    max="1"
                />
                <br />
                <br />
                <label for="typeTxt">User type</label>
                <select id="typeTxt" v-model="inputs.typeTxt">
                    <option value="1">Admin</option>
                    <option value="2">Mod</option>
                    <option value="3">Developer</option>
                    <option value="4">Member</option>
                    <option value="5">Unverified</option>
                </select>
                <br />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Home",
    components: {},

    async mounted() {
        try {
            await this.$store.dispatch("setUsers");
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    data: () => {
        return {
            inputs: {
                usernameTxt: null,
                kickedTxt: null,
                typeTxt: null
            }
        };
    },

    computed: {
        ...mapGetters(["getItems", "getUsers"]),
        items() {
            return this.getItems;
        },
        users() {
            return this.getUsers;
        }
    },
    methods: {
        async addUser() {
            this.$store.commit("SET_ADD_USER_FORM", {
                username: this.inputs.usernameTxt,
                kicked: this.inputs.kickedTxt,
                id_user_type: this.inputs.typeTxt
            });
            try {
                await this.$store.dispatch("addUser");
                await this.$store.dispatch("setUsers");
            } catch (error) {
                console.log(error);
            }
            let addedUserModal = true;
            this.$store.commit("SET_ADDED_USER_MODAL", {
                addedUserModal: addedUserModal
            });

            this.$router.push({
                name: "Users"
            });
        }
    }
};
</script>

<style></style>
