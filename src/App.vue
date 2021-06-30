<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/users">List of users</router-link>
            |
            <router-link to="/AddUser">Add a user</router-link>
        </div>
        <transition name="fade-users" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>

<style>
/* includes styles that are applied everywhere */

body {
    background-color: #333333;
    overflow-x: hidden;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #466481;
}

/* #nav {
    padding: 30px;

}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
} */

#nav {
    padding: 1rem 2rem;
}

#nav a {
    color: #fff;
    text-decoration: none;
    font-size: 1.15rem;
    margin: 0.5rem 1rem;
}

.fade-users-enter-active,
.fade-users-leave-active {
    transition: all 0.3s ease;
}

.fade-users-enter,
.fade-users-leave-active {
    opacity: 0;
}
</style>
