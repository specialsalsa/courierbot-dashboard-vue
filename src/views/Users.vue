<template>
    <div class="users">
        <h1>Table of users in database</h1>
        <div class="card_wrapper">
            <ProfileCard
                v-for="user in users"
                :key="user.discord_user_id"
                :image="user.avatar_url"
                :username="user.username"
                :userType="printUserType(user.id_user_type)"
                :userID="user.discord_user_id"
            />
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

export default {
    name: "Home",
    components: {
        ProfileCard
    },

    async mounted() {
        try {
            await this.$store.dispatch("setUsers");
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    computed: {
        ...mapGetters(["getUsers"]),
        users() {
            return this.getUsers;
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
        }
    }
};
</script>

<style scoped>
.card_wrapper {
    display: grid;
    row-gap: 1rem;
}

.profile_card {
    padding: 0.5rem 1rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
        -10px -10px 20px rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    margin-left: 20%;
    margin-right: 20%;
}

.profile_card_info {
    margin-left: 5rem;

    text-align: left;
}
</style>
