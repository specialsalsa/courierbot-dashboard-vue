<template>
    <div class="hello">
        <div class="server-info">
            <div class="total-members">
                <h3>Total Members:</h3>
                <h3>
                    {{ serverInfo.memberCount }}
                </h3>
            </div>
            <div class="online-members">
                <h3>Online:&nbsp;</h3>
                <transition name="blink-fade" mode="out-in">
                    <h3
                        :key="serverInfo.onlineCount"
                        class="online-members-number"
                    >
                        {{ serverInfo.onlineCount }}
                    </h3>
                </transition>
            </div>
            <div class="bot-members">
                <h3>Bots:</h3>
                <h3 class="bot-members-count">
                    {{ serverInfo.botCount }}
                </h3>
            </div>
            <div class="current-prefix">
                <h3>Current prefix:</h3>
                <h3 class="current-prefix-symbol">{{ currentPrefix }}</h3>
            </div>
        </div>
        <div class="update-prefix">
            <h3>Update prefix</h3>
            <form @submit.prevent="setPrefix()">
                <label for="prefixTxt">Set prefix</label>
                <br />
                <input
                    type="text"
                    id="prefixText"
                    :key="currentPrefix"
                    v-model="prefixInput"
                />
                <br />
                <input type="submit" id="submitPrefix" value="Update" />
                <p v-show="toggleSuccess" id="updated-prefix-text">
                    Successfully updated prefix
                </p>
                <p v-show="toggleError" id="error-updating-prefix-text">
                    Error updating prefix
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data: () => {
        return {
            prefixInput: null,
            serverInfo: {},
            connection: null,
            toggleSuccess: false,
            toggleError: false
        };
    },

    ready() {
        window.addEventListener("beforeunload", this.refreshing);
    },

    created() {
        let self = this;
        console.log("Starting connection to WebSocket Server");
        this.connection = new WebSocket("ws://149.28.70.215:3033");

        this.connection.onmessage = function (event) {
            self.serverInfo = JSON.parse(event.data);
        };

        this.connection.onopen = function () {
            console.log("Successfully connected to the echo websocket server");
        };

        window.addEventListener("beforeunload", this.refreshing);
    },

    async mounted() {
        try {
            await this.$store.dispatch("updatePrefixConfig");
        } catch (err) {
            console.log(err);
        }

        document.querySelector("#prefixText").defaultValue = this.currentPrefix;
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
                this.toggleSuccess = true;
            } catch (error) {
                this.toggleError = true;
                console.log(error);
                return error;
            }
        },

        refreshing() {
            this.connection.send("Remove listeners plz");
        }
    },

    destroyed() {
        this.connection.send("Remove listeners plz");
    }
};
</script>

<style scoped>
.hello {
    display: flex;
    align-items: flex-start;
}

h3 {
    margin-top: 0;
}

.online-members {
    display: flex;
    color: rgb(1, 185, 1);
    justify-content: space-between;
}

.total-members,
.bot-members,
.current-prefix {
    display: flex;
    justify-content: space-between;
}

.online-members-number {
    color: rgb(1, 185, 1);
}

.update-prefix,
.server-info {
    padding: 30px;
    margin: 2rem 1rem;
    background-color: #505050;
    color: #628db4;
    border-radius: 0.5rem;
    box-shadow: 5px 5px 10px #000;
    animation: fadein 0.7s ease;
}

.server-info {
    width: 12%;
}

.update-prefix:hover,
.server-info:hover {
    border: 2px solid #fff;
    padding: 28px;
}

#updated-prefix-text {
    color: rgb(1, 185, 1);
    margin-bottom: 0;
    margin-top: 20px;
}

#error-updating-prefix-text {
    color: red;
    margin-bottom: 0;
    margin-top: 20px;
}

.blink-fade-enter-active {
    transition: all 0.2s ease;
}
.blink-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.blink-fade-enter, .blink-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
    opacity: 0;
}

input#prefixTxt {
    background-color: #8a8a8a;
    color: white;
    border: none;
    margin: 5px 0;
    padding: 0 5px;
    font-size: 1.2em;
}

input#submitPrefix {
    background-color: #628db4;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

@keyframes fadein {
    0% {
        opacity: 0;
        margin-top: 100%;
    }
    100% {
        opacity: 1;
    }
}
</style>
