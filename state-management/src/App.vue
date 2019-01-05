<template>
    <div id="app">
        <header>
            <b-navbar toggleable="md" type="dark" placement="fixed" fill="false" variant="dark">
                <div class="container">
                    <b-navbar-brand to="/">Northwind Traders</b-navbar-brand>

                    <b-navbar-toggle target="navbarCollapse"></b-navbar-toggle>

                    <b-collapse is-nav id="navbarCollapse">
                        <b-navbar-nav>
                            <b-nav-item to="/">
                                <home-icon></home-icon>Home
                            </b-nav-item>
                            <b-nav-item to="/categories">
                                <list-icon></list-icon>Categories
                            </b-nav-item>
                            <b-nav-item to="/products">
                                <shopping-cart-icon></shopping-cart-icon>Products
                            </b-nav-item>
                            <b-nav-item to="/suppliers">
                                <package-icon></package-icon>Suppliers
                            </b-nav-item>
                        </b-navbar-nav>
                    </b-collapse>
                </div>
            </b-navbar>
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
import {
    HomeIcon,
    ListIcon,
    ShoppingCartIcon,
    PackageIcon
} from 'vue-feather-icons'

export default {
    components: {
        HomeIcon,
        ListIcon,
        ShoppingCartIcon,
        PackageIcon
    },
    data() {
        return {
            title: 'Northwind Traders'
        }
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

/* main > .container {
    padding: 60px 15px 0;
} */

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
