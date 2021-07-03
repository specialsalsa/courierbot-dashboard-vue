<template>
    <!-- prettier-ignore -->
    <div class="profile_card">
        <img @click="openProfile(userID, username)" :src="image || 'https://cdn.logojoy.com/wp-content/uploads/20210422095037/discord-mascot.png'" :alt="username"/>
        <div class="profile_card_info" @click="openProfile(userID, username)">
            <h3>{{ username }}</h3>
            <p>Type: <b>{{ userType }}</b></p>
            <p>ID: {{ userID }}</p>
        </div>
        <div class="profile_card_middle" @click="openProfile(userID, username)"></div>
        <div class="delete_button_div">
            <button class="delete_button" @click="openModal(userID)">Delete</button>
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
            type: Number,
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
        },

        openModal(id) {
            let modal = document.querySelector(".deleteModal");

            modal.classList.add("show");
            console.log(id);
            // change the value of the selected user id in the store
            this.$store.commit("SET_SELECTED_USER_ID", {
                id: id
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
    justify-content: space-around;
    margin-left: 20%;
    margin-right: 20%;
    transition: background-color 0.2s ease;
}

.profile_card:hover {
    background-color: rgb(160, 160, 160);
    transition: all 0.2s;
}

.profile_card_info {
    padding-right: auto;
    width: auto;
}

.profile_card_middle {
    /* width: 50%; */
    height: 120px;
    flex-grow: 1;
}

.delete_button {
    border-radius: 8px;
    background-color: #6892bb;
    color: white;
    padding: 12px 12px;
    /* box-shadow: 5px 5px 10px #303030a8; */
    text-decoration: none;
    font-family: inherit;
    cursor: pointer;
}

img {
    border-radius: 50%;
    /* border: 5px solid #303030; */
    box-shadow: 0px 0px 20px #303030a8;
    margin: 0rem 2rem;
}

.profile_card img {
    max-width: 100px;
}

h3 {
    text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.26);
}

.profile_card_info {
    /* margin-left: 5rem; */
    text-align: left;
}

@media screen and (max-width: 992px) {
    .profile_card_info {
        font-size: 1.3rem;
    }

    .profile_card {
        margin-left: 5%;
        margin-right: 5%;
    }

    .delete_button_div {
        margin-left: auto;
    }
}
</style>
