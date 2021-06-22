<template>
    <div class="profile">
        <div class="usernameContainer">
            <h1 class="username">{{ user.username }}</h1>
        </div>
        <div class="profileImageContainer">
            <transition name="profile-image" tag="img" appear>
                <img
                    class="profileImage"
                    :src="user.avatar_url"
                    alt="Profile image"
                />
            </transition>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data: () => {
        return {
            user: ""
        };
    },
    mounted() {
        this.user = this.getSelectedUserByID(this.getSelectedUserID);
    },

    computed: {
        ...mapGetters(["getSelectedUserByID", "getSelectedUserID"])
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
}

.profileImageContainer {
    display: flex;
    justify-content: center;
}

.profileImage {
    border-radius: 10%;
}

.profile-image-enter-active {
    transition: all 1s ease;
}

.profile-image-enter,
.profile-image-leave-to {
    opacity: 0;
    transform: translateY(40px);
}
</style>
