<template>
    <!-- prettier-ignore -->
    <div class="profile_card" @click="openProfile(userID, username)">
        <img :src="image || 'https://cdn.logojoy.com/wp-content/uploads/20210422095037/discord-mascot.png'" :alt="username"/>
        <div class="profile_card_info">
            <h3>{{ username }}</h3>
            <p>Type: <b>{{ userType }}</b></p>
            <p>ID: {{ userID }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileCard",
    props: {
        image: {
            type: String,
            required: false
        },
        username: {
            type: String,
            required: true
        },
        userType: {
            type: String,
            required: false
        },
        userID: {
            type: String,
            required: true
        }
    },
    mounted() {},
    methods: {
        openProfile(userID, username) {
            localStorage.setItem("userID", userID);
            this.$store.commit("SET_SELECTED_USER_ID", {
                id: userID
            });

            this.$router.push({
                name: "Profile",
                params: { name: username }
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card_wrapper {
    display: grid;
    row-gap: 1rem;
}

.profile_card {
    padding: 0.5rem 1rem;
    background-color: rgb(138, 138, 138);
    border-radius: 8px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
        -10px -10px 20px rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    margin-left: 20%;
    margin-right: 20%;
}

img {
    border-radius: 50%;
    /* border: 5px solid #303030; */
    box-shadow: 0px 0px 20px #303030a8;
}

.profile_card img {
    max-width: 100px;
}

.profile_card_info {
    margin-left: 5rem;
    text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.26);
    text-align: left;
}

@media screen and (max-width: 992px) {
    .profile_card_info {
        font-size: 2rem;
    }
}
</style>
