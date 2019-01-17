<template>
    <b-navbar toggleable="md" type="dark" placement="fixed" fill="false" variant="dark">
        <div class="container">
            <b-navbar-brand to="/">Northwind Traders</b-navbar-brand>
            <b-navbar-toggle target="navbarCollapse"></b-navbar-toggle>
            <b-collapse is-nav id="navbarCollapse">
                <b-navbar-nav class="mr-auto">
                    <b-nav-item to="/" :exact="true">Home</b-nav-item>
                    <b-nav-item to="/suppliers">Suppliers</b-nav-item>
                    <b-nav-item to="/categories">Categories</b-nav-item>
                    <b-nav-item to="/products">Products</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
export default {}
</script>

<style scoped>
.nav > .container {
    min-height: 56px;
}
</style>
