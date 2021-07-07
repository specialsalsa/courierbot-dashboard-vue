<template>
    <div class="hello">
        <div class="update-prefix">
            <h3>Update prefix</h3>
            <form @submit.prevent="setPrefix">
                <label for="prefixTxt">Set prefix</label>
                <br />
                <input type="text" id="prefixTxt" v-model="prefixInput" />
                <br />
                <input type="submit" id="submitPrefix" value="Update" />
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data: () => {
        return {
            prefixInput: ""
        };
    },

    async mounted() {
        try {
            await this.$store.dispatch("updatePrefixConfig");
        } catch (err) {
            console.log(err);
        }
        document.querySelector("#prefixTxt").defaultValue = this.currentPrefix;
    },

    computed: {
        ...mapGetters(["getPrefix"]),
        currentPrefix() {
            return this.getPrefix;
        }
    },

    methods: {
        async setPrefix() {
            this.$store.commit("SET_PREFIX_INPUT", {
                prefixInput: this.prefixInput
            });

            try {
                await this.$store.dispatch("updatePrefix");
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    }
};
</script>

<style scoped>
.hello {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

h3 {
    margin-top: 0;
}

.update-prefix {
    padding: 30px;
    margin: 2rem 2rem;
    background-color: #505050;
    color: #628db4;
    border-radius: 1rem;
    box-shadow: 5px 5px 10px #000;
}

.update-prefix:hover {
    border: 2px solid #fff;
    padding: 28px;
}

input#prefixTxt {
    background-color: #808080;
    color: white;
    border: none;
    margin: 5px 0;
}

input#submitPrefix {
    background-color: #628db4;
    border: none;
    border-radius: 3px;
}
</style>
