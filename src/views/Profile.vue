<template>
    <div class="profile">
        <h1>{{ user.username }}</h1>
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

<style></style>
