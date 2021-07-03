<template>
    <transition name="notificationFade">
        <div v-if="addedUserModal" class="success_added_user_modal">
            <p>Successfully added user {{ username }}</p>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    mounted() {
        console.log(this.getAddedUserModal);
        setTimeout(() => {
            this.$store.commit("SET_ADDED_USER_MODAL", {
                addedUserModal: false
            });
        }, 5000);
    },
    computed: {
        ...mapGetters(["getAddedUsername", "getAddedUserModal"]),
        username() {
            return this.getAddedUsername;
        },
        addedUserModal() {
            return this.getAddedUserModal;
        }
    }
};
</script>

<style scoped>
.success_added_user_modal {
    position: fixed;
    padding: 20px;
    border-radius: 10px;
    background-color: #466481;
    color: white;
    opacity: 1;
    visibility: visible;
    bottom: 0;
    right: 0;
    margin-bottom: 1.5vw;
    margin-right: 1.5vw;
    animation: fadein 1s ease;
    box-shadow: 5px 5px 5px #1d1d1d;
}

.notificationFade-enter-active,
.notificationFade-leave-active {
    transition: opacity 0.2s;
}

.notificationFade-enter,
.notificationFade-leave-to {
    opacity: 0;
}

@keyframes fadein {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }
    100% {
        opacity: 1;
    }
}
</style>
