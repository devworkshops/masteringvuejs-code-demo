<template>
    <b-navbar toggleable="md" type="dark" placement="fixed" fill="false" variant="dark">
        <div class="container">
            <b-navbar-brand to="/">Northwind Traders</b-navbar-brand>
            <b-navbar-toggle target="navbarCollapse"></b-navbar-toggle>
            <b-collapse is-nav id="navbarCollapse">
                <b-navbar-nav class="mr-auto">
                    <b-nav-item to="/" :exact="true">
                        <vue-feather type="home"></vue-feather>Home
                    </b-nav-item>
                    <b-nav-item to="/suppliers">
                        <vue-feather type="shopping-cart"></vue-feather>Suppliers
                    </b-nav-item>
                    <b-nav-item to="/categories">
                        <vue-feather type="list"></vue-feather>Categories
                    </b-nav-item>
                    <b-nav-item to="/products">
                        <vue-feather type="package"></vue-feather>Products
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
import VueFeather from 'vue-feather'

export default {
    components: {
        VueFeather
    }
}
</script>

<style scoped>
.nav > .container {
    min-height: 56px;
}
.navbar .nav-link .feather {
    margin-right: 4px;
    color: #999;
}
</style>
