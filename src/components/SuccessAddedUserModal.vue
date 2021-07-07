<template>
    <transition name="notificationFade">
        <div v-if="addedUserModal" class="success_added_user_modal">
            <div class="button-div">
                <button @click="closeNotification" class="x-button">x</button>
            </div>
            <p>Successfully added user {{ username }}</p>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    mounted() {
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
    },
    methods: {
        closeNotification() {
            this.$store.commit("SET_ADDED_USER_MODAL", {
                addedUserModal: false
            });
        }
    }
};
</script>

<style scoped>
.success_added_user_modal {
    position: fixed;
    padding: 5px 10px 10px 10px;
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

p {
    margin-top: 7px;
}

.button-div {
    text-align: right;
}

.x-button {
    background: none !important;
    border: none;
    padding: 0 !important;
    font-family: arial, sans-serif;
    /*input has OS specific font-family*/
    color: #fff;
    cursor: pointer;
}

.x-button:hover {
    text-decoration: underline;
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
