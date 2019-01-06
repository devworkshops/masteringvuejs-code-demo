<template>
    <div>
        <div class="clearfix">
            <h4 class="float-left pt-1">Notifications</h4>
            <b-button variant="link" v-b-toggle.collapseNotifications class="float-right">
                <x-icon></x-icon>
            </b-button>
        </div>

        <p>No new notifications for this session.</p>

        <b-alert show dismissible variant="success" @dismissed="dismissedNotification(1)">
            <strong>Success</strong>
            <br>A new product has been created. A new product has been created.
        </b-alert>

        <b-alert show dismissible variant="danger" @dismissed="dismissedNotification(2)">
            <strong>Error</strong>
            <br>The product has failed to update.
        </b-alert>
    </div>
</template>

<script>
import { XIcon } from 'vue-feather-icons'

export default {
    components: {
        XIcon
    },
    methods: {
        dismissedNotification(id) {
            console.log('Dismissed notification ' + id)
        }
    }
}
</script>

<style scoped>
.feather {
    height: 28px;
    width: 28px;
    color: #999;
}
.alert {
    max-width: 258px;
}
</style>
