<template>
    <div class="hello">
        <h1>{{ increment }}</h1>
        <button @click="dataIncrement">Click to increment</button>
    </div>
</template>

<script>
let increment = 1;
export default {
    data: () => {
        return {
            increment
        };
    },

    methods: {
        dataIncrement() {
            this.increment++;
            console.log(this.increment);
        }
    }
};
</script>

<style></style>
