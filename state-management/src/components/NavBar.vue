<template>
    <b-navbar toggleable="md" type="dark" placement="fixed" fill="false" variant="dark">
        <div class="container">
            <b-navbar-brand to="/">Northwind Traders</b-navbar-brand>

            <b-navbar-toggle target="navbarCollapse"></b-navbar-toggle>

            <b-collapse is-nav id="navbarCollapse">
                <b-navbar-nav class="mr-auto">
                    <b-nav-item to="/" :exact="true">
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
                    <b-nav-item to="/about">
                        <info-icon></info-icon>About
                    </b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav>
                    <b-nav-item v-b-toggle.collapseNotifications>
                        <bell-icon></bell-icon>Notifications
                        <b-badge>{{ $store.getters.notificationCount }}</b-badge>
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
import {
    HomeIcon,
    ListIcon,
    ShoppingCartIcon,
    PackageIcon,
    InfoIcon,
    BellIcon
} from 'vue-feather-icons'

export default {
    components: {
        HomeIcon,
        ListIcon,
        ShoppingCartIcon,
        PackageIcon,
        InfoIcon,
        BellIcon
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
