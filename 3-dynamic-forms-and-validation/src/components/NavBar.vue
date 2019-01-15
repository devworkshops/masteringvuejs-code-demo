<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">Northwind Traders</a>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapse"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link to="/" :exact="true" class="nav-link">
                            <home-icon></home-icon>Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/suppliers" :exact="true" class="nav-link">
                            <package-icon></package-icon>Suppliers
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/categories" :exact="true" class="nav-link">
                            <list-icon></list-icon>Categories
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { HomeIcon, PackageIcon, ListIcon } from 'vue-feather-icons'

export default {
    components: {
        HomeIcon,
        PackageIcon,
        ListIcon
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
