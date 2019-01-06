<template>
    <div id="app">
        <header>
            <nav-bar></nav-bar>
        </header>

        <main role="main" class="flex-shrink-0">
            <div class="container">
                <router-view/>
            </div>
        </main>

        <footer class="footer mt-auto py-3">
            <div class="container">
                <span class="text-muted">Northwind Traders &copy; {{new Date()|date('YYYY')}}</span>
            </div>
        </footer>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
    components: {
        NavBar
    }
}
</script>

<style>
html,
body {
    height: 100%;
}

#app {
    display: flex;
    flex-direction: column;
    height: 100%;
}

main > .container {
    padding: 8px 15px 8px 15px;
}

.feather {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
}

.nav > .container {
    min-height: 56px;
}

.navbar .nav-link .feather {
    margin-right: 4px;
    color: #999;
}

.footer {
    background-color: #f5f5f5;
}

.footer > .container {
    padding-right: 15px;
    padding-left: 15px;
}
</style>
