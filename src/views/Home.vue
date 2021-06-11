<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />

        <div class="card_wrapper">
            <div class="card" v-for="user in users" :key="user.user_id">
                <div class="card_info">
                    <h3>Name: {{ user.username }}</h3>

                    <p>Type: {{ user.id_user_type }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Home",
    components: {
        HelloWorld
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
        ...mapGetters(["getItems", "getUsers"]),
        items() {
            return this.getItems;
        },
        users() {
            return this.getUsers;
        }
    }
};
</script>
<style scoped>
.card_wrapper {
    display: grid;
    row-gap: 1rem;
}

.card {
    padding: 0.5rem 1rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2),
        -10px -10px 20px rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
}

.card_info {
    margin-left: 2rem;

    text-align: left;
}
</style>
