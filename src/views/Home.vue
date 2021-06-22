<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />

        <!-- <div class="card_wrapper">
            <div class="card" v-for="user in users" :key="user.user_id">
                <div class="card_info">
                    <h3>Name: {{ user.username }}</h3>

                    <p>Type: {{ user.id_user_type }}</p>
                </div>
            </div>
        </div> -->
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
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { mapGetters } from "vuex";

export default {
    name: "Home",
    components: {
        // HelloWorld
    },

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
                this.$store.dispatch("addUser");
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
<style scoped>
.card_wrapper {
    display: grid;
    row-gap: 1rem;
}

.card {
    padding: 0.5rem 1rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2),
        -10px -10px 20px rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
}

.card_info {
    margin-left: 2rem;

    text-align: left;
}

label {
    color: #fff;
}
</style>
