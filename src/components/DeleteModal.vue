<template>
    <div class="deleteModal">
        <h2>Are you sure you want to delete the user {{ name }}?</h2>

        <div class="button_group">
            <button @click="deleteUser">Confirm</button>
            <button @click="closePopup">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: false
        }
    },
    methods: {
        closePopup() {
            let modal = document.querySelector(".deleteModal");

            modal.classList.remove("show");
        },

        async deleteUser() {
            try {
                await this.$store.dispatch("deleteUser");
                await this.$store.dispatch("setUsers");
            } catch (error) {
                console.log(error);
                return error;
            }

            this.closePopup();
        }
    }
};
</script>

<style>
.deleteModal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    padding: 20px;
    box-shadow: 5px 5px 10px #000;
    visibility: hidden;
    background-color: rgb(185, 185, 185);
    border-radius: 10px;
}

.show {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s ease;
    box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.507);
}
</style>
