<template>
    <header class="header">
        <a class="toogle" @click="toggleMenu" v-if="!hideToggle">
            <i class="fa lg" :class="icon"></i>
        </a>
        <h1 class="title">
            {{ title }}
        </h1>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: String,
        hideToggle: Boolean
    },
    computed: {
        icon(){
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
        }
    },
    methods:{
        toggleMenu(){
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style>
.header{
    grid-area: header;
    background: linear-gradient(to right, #1e469a, #49a7c1); 

    display: flex;
    justify-content: center;       
    align-content: center;
}

.title {
    font-size: 1.2em;
    color: #FFF;
    font-weight: 100;
    flex-grow: 1;
    text-align: center;
}

.title a {
    color: #FFF;
    text-decoration: none;
}

header.header > a.toogle {
    width: 60px;
    height: 100%;
    color: #FFF;
    justify-content: flex-start;
    text-decoration: none;
    
    display: flex;
    justify-content: center;
    align-items: center;
}

header.header > a.toogle:hover {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>