<template>
    <div class="profile">
        <div class="usernameContainer">
            <h1 class="username">{{ user.username }}</h1>
        </div>
        <div class="profileImageContainer">
            <!--prettier-ignore-->
            <img
                class="profileImage"
                :src="user.avatar_url || 'https://cdn.logojoy.com/wp-content/uploads/20210422095037/discord-mascot.png'"
                alt="Profile image"
            />
        </div>
        <br />
        <div class="updateUser">
            <div class="updateUserTitle">
                <h2>Update user</h2>
            </div>
            <div class="updateUserDiv">
                <form @submit.prevent="updateUser">
                    <label for="usernameTxt">Username</label>
                    <br />
                    <input
                        type="text"
                        id="usernameTxt"
                        v-model="userUpdate.username"
                    />
                    <br />
                    <br />
                    <label for="kickedTxt">Kicked</label>
                    <br />
                    <input
                        type="number"
                        id="kickedTxt"
                        v-model="userUpdate.kicked"
                    />
                    <br />
                    <br />
                    <input type="submit" value="Update" />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data: () => {
        return {
            user: "",
            userUpdate: {
                username: "",
                kicked: ""
            }
        };
    },
    mounted() {
        this.user = this.getSelectedUserByID(this.getSelectedUserID);
    },

    computed: {
        // easy way to call the functions
        ...mapGetters(["getSelectedUserByID", "getSelectedUserID"])
    },
    methods: {
        async updateUser() {
            // commit MUTATION
            this.$store.commit("SET_UPDATE_USER_FORM", {
                username: this.userUpdate.username,
                kicked: this.userUpdate.kicked
            });

            try {
                await this.$store.dispatch("updateUser");
                // setUsers to update the list of users inside the app
                // mutates -> to change the state -> users [] (array)
                await this.$store.dispatch("setUsers");
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    }
};
</script>

<style scoped>
.usernameContainer {
    display: flex;
    justify-content: center;
}

.username {
    color: #fff;
    animation: fadein 1s forwards;
}

.profileImageContainer {
    display: flex;
    justify-content: center;
    animation: fadein 1s forwards;
}

.profileImage {
    border-radius: 10%;
    max-height: 150px;
}

.updateUser {
    animation: fadein-delay 0.8s forwards;
}

.updateUserTitle {
    display: flex;
    justify-content: flex-start;
    margin-left: 43%;
    color: #fff;
    margin-top: 3em;
    margin-bottom: -1%;
    /* animation: fadein-delay 1s forwards; */
}

.updateUserDiv {
    padding: 1.5em;
    margin-bottom: 2em;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.507);
    display: flex;
    justify-content: center;
    color: #fff;
    background-color: #466481;
    margin-left: 42%;
    margin-right: 42%;
    border-radius: 8px;
    /* animation: fadein-delay 1s forwards; */
}

#usernameTxt,
#kickedTxt {
    width: 100%;
    /* animation: fadein-delay 1s forwards; */
}

@keyframes fadein {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes fadein-delay {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0;
        transform: translateX(-10%);
    }

    85% {
        transform: translateX(1.5%);
    }

    100% {
        opacity: 1;
    }
}

@media screen and (max-width: 992px) {
    .updateUserTitle {
        margin-left: 30%;
    }

    .updateUserDiv {
        margin-left: 30%;
        margin-right: 30%;
    }
}
</style>
