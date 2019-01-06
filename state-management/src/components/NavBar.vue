<template>
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
    }
}
</script>

<style scoped>
</style>
