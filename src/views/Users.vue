<template>
    <div class="users">
        <SuccessAddedUserModal />
        <h1 id="profileTitle">Table of users in database</h1>

        <div class="filters">
            <input
                type="text"
                placeholder="Search users..."
                v-model="searchInput"
            />
            <button class="order-alphabetically-button" @click="order = !order">
                Order {{ order === false ? "Z-A" : "A-Z" }}
            </button>
        </div>

        <DeleteModal :name="thisUser.username" />
        <div class="card_wrapper">
            <transition-group name="list" tag="p" appear>
                <ProfileCard
                    v-for="user in searchForUsers"
                    class="list-item"
                    :key="user.user_id"
                    :image="user.avatar_url"
                    :username="user.username"
                    :userType="printUserType(user.id_user_type)"
                    :userID="user.user_id"
                />
            </transition-group>
            <!-- <div class="profile_card" v-for="user in users" :key="user.user_id">
                <img :src="user.avatar_url" :alt="user.login" />
                <div class="profile_card_info">
                    <h3>{{ user.username }}</h3>

                    <p>Type: {{ printUserType(user.id_user_type) }}</p>
                    <p>ID: {{ user.discord_user_id }}</p>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProfileCard from "@/components/ProfileCard.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import SuccessAddedUserModal from "@/components/SuccessAddedUserModal.vue";

export default {
    name: "Home",

    components: {
        ProfileCard,
        DeleteModal,
        SuccessAddedUserModal
    },

    data: () => {
        return {
            searchInput: "",
            filteredUsers: "",
            order: false,
            originalOrder: true,
            awaitingSearch: false
        };
    },

    // mounted: where the template (html and css) starts being rendered
    async mounted() {
        try {
            // dispatch is to call an action
            // changes the state
            await this.$store.dispatch("setUsers");
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    computed: {
        // methods that are reactive to changes
        ...mapGetters(["getUsers", "getSelectedUserByID", "getSelectedUserID"]),
        users() {
            // returns state.users from store
            return this.getUsers;
        },

        searchForUsers() {
            return this.filterAlphabetically(this.search(this.users));
        },

        thisUser() {
            return this.getSelectedUserByID(this.getSelectedUserID) != undefined
                ? this.getSelectedUserByID(this.getSelectedUserID)
                : "";
        }
    },

    methods: {
        printUserType(userType) {
            const userTypeObject = {
                1: "Admin",
                2: "Mod",
                3: "Developer",
                4: "Member",
                5: "Unverified"
            };

            return userTypeObject[userType];
        },
        compareName(a, b) {
            if (a.username.toLowerCase() < b.username.toLowerCase()) return -1;
            if (a.username.toLowerCase() > b.username.toLowerCase()) return 1;
            else return 0;
        },

        compareName2(a, b) {
            if (a.username.toLowerCase() > b.username.toLowerCase()) return -1;
            if (a.username.toLowerCase() < b.username.toLowerCase()) return 1;
            else return 0;
        },

        filterAlphabetically(users) {
            if (!this.order) {
                return [...users].sort(this.compareName);
            } else {
                return [...users].sort(this.compareName2);
            }
            // console.log(this.getUsers.sort(this.compareName));
            // return this.getUsers.sort(this.compareName);
        },

        search(users) {
            return users.filter(
                user =>
                    !user.username
                        .toLowerCase()
                        .indexOf(this.searchInput.toLowerCase())
            );
        }
    }
};
</script>

<style scoped>
.card_wrapper {
    display: grid;
    row-gap: 1.15rem;
}

h1#profileTitle {
    text-align: center;
    margin: 3rem 0;
}

.list-enter-active,
.list-enter-to {
    transition: all 0.7s ease-in-out;
}

.list-item {
    margin-bottom: 1rem;
    transition: all 0.7s ease-in-out;
}

.order-alphabetically-button {
    background-color: #466481;
    color: white;
    border: 2px thick #000;
    border-radius: 5px;
}

.list-enter {
    opacity: 0;
    transition: all 0.7s ease-in;
    transform: translateY(40px);
}

.filters {
    margin-top: 5vh;
    padding: 2rem 3rem;
    border-radius: 8px;
    margin: 0 20%;
    background-color: rgb(138, 138, 138);

    display: flex;
    justify-content: space-between;
}

@media screen and (max-width: 992px) {
    .filters {
        margin: 0 5%;
    }
}
</style>
