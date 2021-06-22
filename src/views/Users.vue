<template>
    <div class="users">
        <h1 id="profileTitle">Table of users in database</h1>
        <div class="card_wrapper">
            <transition-group name="list" tag="p" appear>
                <ProfileCard
                    v-for="user in users"
                    class="list-item"
                    :key="user.discord_user_id"
                    :image="user.avatar_url"
                    :username="user.username"
                    :userType="printUserType(user.id_user_type)"
                    :userID="user.discord_user_id"
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
    row-gap: 1.15rem;
}

h1#profileTitle {
    text-align: center;
    margin: 3rem 0;
}

.list-enter-active {
    transition: all 1s ease;
}

.list-item {
    margin-bottom: 1rem;
}

.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translateY(40px);
}
</style>
